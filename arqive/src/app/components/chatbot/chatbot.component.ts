import { Component, OnInit, NgZone, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// Interface für ChatbotToolCall
interface ChatbotToolCall {
  tool: string;
  toolInput?: {
    Query?: string;
    filter?: string;
    SKU?: string;
    productId?: number;
    Products?: string;
    SKUs?: string;
    page?: string;       // Für allgemeine Seitennavigation
    category?: string;   // Für Kategorie-Filter im Product-Browser
  };
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit, AfterViewInit, OnDestroy {  private chatbotInitialized = false;
  private initAttempts = 0;
  private maxInitAttempts = 3;
  private isProcessingToolCall = false; // Flag, um mehrfache Tool-Aufrufe zu verhindern
  private pendingProductIds: number[] = []; // Liste der Produkt-IDs, die gerade geladen werden
  private isBrowser: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }  ngOnInit() {
    // Browser-Funktionen nur ausführen, wenn im Browser
    if (this.isBrowser) {
      // Lade das Flowise Chatbot Skript nach dem Initialisieren der Komponente
      this.loadFlowiseScript();
      
      // Event-Listener für Tool-Calls vom Chatbot - wird nur einmal registriert
      this.setupToolCallListener();
    }
  }  ngAfterViewInit() {
    // Browser-Funktionen nur ausführen, wenn im Browser
    if (this.isBrowser) {
      // Prüfe nach einem kurzen Timeout, ob der Chatbot-Button sichtbar ist
      setTimeout(() => {
        this.checkChatbotVisibility();
      }, 3000);
      
      // Erneuter Check nach 5 Sekunden, falls der Button noch nicht geladen wurde
      setTimeout(() => {
        this.checkChatbotVisibility();
      }, 5000);
    }
  }  ngOnDestroy() {
    // Event-Listener entfernen, um Memory-Leaks zu vermeiden
    if (this.isBrowser) {
      window.removeEventListener('flowiseToolCall', this.handleToolCallEvent);
      console.log('ChatbotComponent zerstört, Event-Listener entfernt');
    }
  }
    /**
   * Prüft, ob der Chatbot sichtbar ist und zeigt ggf. den Fallback-Button an
   */
  checkChatbotVisibility() {
    if (!this.isBrowser) return;
    
    const chatbotButton = document.querySelector('.fw-chat-btn');
    const fallbackButton = document.getElementById('chatbot-fallback');
    
    if (!chatbotButton && fallbackButton) {
      console.log('Chatbot Button nicht gefunden, zeige Fallback an');
      fallbackButton.style.display = 'block';
      
      // Erneuter Initialisierungsversuch
      if (this.initAttempts < this.maxInitAttempts) {
        this.initAttempts++;
        this.initFlowiseChat();
      }
    }
  }  /**
   * Flowise Script dynamisch laden
   */  
  loadFlowiseScript() {
    if (!this.isBrowser) return;
    
    // Dynamisch Flowise Script laden
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
    script.type = 'module';
    script.onload = () => {
      // Nachdem das Script geladen wurde, initialisieren wir den Chatbot
      this.initFlowiseChat();
    };
    
    document.head.appendChild(script);
  }
    /**
   * Initialisiere den Flowise Chatbot nach dem Script-Laden
   */
  initFlowiseChat() {
    if (!this.isBrowser) return;
    
    // @ts-ignore - Chatbot wird dynamisch geladen
    const Chatbot = window.Chatbot;
    
    if (!Chatbot) {
      console.error('Flowise Chatbot konnte nicht geladen werden');
      return;
    }
    
    try {
      console.log('Initialisiere Flowise Chatbot...');      Chatbot.init({
        chatflowid: "8e13a63c-06a1-44fb-8d19-faed0dc4a3d4",
        apiHost: "https://cloud.flowiseai.com",        
        theme: {            
          button: {            
            backgroundColor: "#D4AF37", // Goldfarbe beibehalten
            right: 25,
            bottom: 25,
            size: 58,
            iconColor: "#ffffff" // Weißes Icon
          },
          chatWindow: {
            title: "ARQIVE Assistent - Bekki",
            welcomeMessage: "",
            backgroundColor: "#f8f9fa",
            fontSize: 16,
            height: 800, // Höhe des Chat-Fensters
            width: 450, // Breite des Chat-Fensters
            starterPrompts: ["Suche nach Produkten", "Öffne den Warenkorb"],
            botMessage: {
              backgroundColor: "#ffffff"
            },
            userMessage: {
              backgroundColor: "#D4AF37"
            },
            textInput: {
              placeholder: "Stellen Sie eine Frage...",
              maxChars: 200
            }
          },
          customCSS: `
            .fw-chat-container {
              border-radius: 16px !important; /* Rundere Ecken für das Chat-Fenster */
              overflow: hidden;
            }
            .fw-chat-header {
              border-top-left-radius: 16px !important;
              border-top-right-radius: 16px !important;
            }
          `
        },
        // Beobachter-Konfiguration für Nachrichten und Ladezustand
        observersConfig: {          // Der Bot-Nachrichtenstapel hat sich geändert
          observeMessages: function(messages: any) {
            console.log('Chatbot Nachrichten:', messages);
            if (messages && messages.length > 0) {
              const lastMessage = messages[messages.length - 1];
              if (lastMessage && lastMessage.type === 'apiMessage' && lastMessage.usedTools && lastMessage.usedTools.length > 0) {
                // Extrahiere den letzten verwendeten Tool-Aufruf
                const toolCall = lastMessage.usedTools[lastMessage.usedTools.length - 1];
                window.dispatchEvent(new CustomEvent('flowiseToolCall', { detail: toolCall }));
              }
            }
          },
          // Der Bot-Ladezustand hat sich geändert
          observeLoading: function(loading: boolean) {
            console.log('Chatbot Ladezustand:', loading);
          },
        }
      });
      console.log('Flowise Chatbot initialisiert');    } catch (error) {
      console.error('Fehler bei der Initialisierung des Flowise Chatbots:', error);
    }
    
    // Hier keinen redundanten Event-Listener mehr hinzufügen
  }
    /**
   * Registriert den Event-Listener für Tool-Calls (nur einmal)
   */
  private setupToolCallListener() {
    if (!this.isBrowser) return;
    
    // Entferne zuerst alle bestehenden Event-Listener für dieses Event
    window.removeEventListener('flowiseToolCall', this.handleToolCallEvent);
    
    // Füge den Event-Listener neu hinzu
    window.addEventListener('flowiseToolCall', this.handleToolCallEvent);
  }
  
  /**
   * Event-Handler für flowiseToolCall-Events
   */
  private handleToolCallEvent = (event: any) => {
    if (event.detail) {
      this.ngZone.run(() => {
        this.handleToolCall(event.detail);
      });
    }
  }
  
  /**
   * Verarbeite mögliche Tool-Aufrufe aus einer Chatbot-Nachricht
   */
  private processToolCalls(message: any) {
    if (message && message.type === 'apiMessage' && message.usedTools && message.usedTools.length > 0) {
      // Extrahiere den letzten verwendeten Tool-Aufruf
      const toolCall = message.usedTools[message.usedTools.length - 1];
      this.handleToolCall(toolCall);
    }
  }

  /**
   * Behandle einen Tool-Aufruf und führe die entsprechende Aktion aus
   */  private handleToolCall(toolCall: ChatbotToolCall) {
    console.log('Tool-Aufruf erhalten:', toolCall);
    
    // Verhindern, dass derselbe Tool-Aufruf mehrmals verarbeitet wird
    if (this.isProcessingToolCall) {
      console.log('Ein Tool-Aufruf wird bereits verarbeitet, ignoriere diesen Aufruf');
      return;
    }
    
    this.isProcessingToolCall = true;
      switch (toolCall?.tool) {
      case 'open_basket':
        this.navigate('/basket');
        break;
        
      case 'open_home':
        this.navigate('/');
        break;
        
      case 'open_product_browser':
        this.navigate('/product-browser');
        break;
          case 'open_payment':
        this.navigate('/payment');
        break;
        
      case 'open_bekki':
        this.navigate('/bekki');
        break;
        
      case 'open_product_page':
        if (toolCall.toolInput?.productId) {
          this.navigate(`/product-page/${toolCall.toolInput.productId}`);
        } else {
          console.warn('Keine Produkt-ID für Produktseite angegeben');
        }
        break;
          case'add_product_to_basket':
        if (toolCall.toolInput?.productId) {
          // Einzelnes Produkt hinzufügen
          this.addProductToBasket(Number(toolCall.toolInput.productId));
        } else if (toolCall.toolInput?.Products) {
          // Mehrere Produkte zum Warenkorb hinzufügen
          const productIdsText = toolCall.toolInput.Products;
          console.log('Produkt-IDs als Text:', productIdsText);
          
          const productIds = productIdsText.split(';')
            .map(id => {
              const trimmedId = id.trim();
              console.log('Verarbeite ID:', trimmedId);
              return Number(trimmedId);
            })
            .filter(id => {
              const isValid = !isNaN(id);
              if (!isValid) console.warn('Ungültige Produkt-ID ignoriert:', id);
              return isValid;
            });
          
          console.log('Verarbeitete Produkt-IDs:', productIds);
          
          // Produkte einzeln hinzufügen, um Duplikate zu vermeiden
          if (productIds.length > 0) {
            productIds.forEach(id => this.addProductToBasket(id));
          } else {
            console.warn('Keine gültigen Produkt-IDs gefunden in:', productIdsText);
          }
        }
        break;
        
      default:
        console.log('Unbekannter Tool-Aufruf:', toolCall?.tool);
        break;
    }
    
    // Nach einer kurzen Verzögerung wieder erlauben, dass Tool-Aufrufe verarbeitet werden
    setTimeout(() => {
      this.isProcessingToolCall = false;
    }, 1000);
  }
    /**
   * Produkt zum Warenkorb hinzufügen
   */
  private addProductToBasket(productId: number) {
    // Prüfen, ob das Produkt bereits angefragt wird
    if (this.pendingProductIds.includes(productId)) {
      console.log(`Produkt ${productId} wird bereits geladen, überspringe Anfrage`);
      return;
    }
    
    // Zu den ausstehenden Produkten hinzufügen
    this.pendingProductIds.push(productId);
    
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.cartService.addToCart(product, 1);
        console.log('Produkt zum Warenkorb hinzugefügt:', product);
          // Aus der Liste der ausstehenden Produkte entfernen
        this.pendingProductIds = this.pendingProductIds.filter((id: number) => id !== productId);
      },
      error: (error) => {
        console.error('Fehler beim Laden des Produkts:', error);
        // Aus der Liste der ausstehenden Produkte entfernen
        this.pendingProductIds = this.pendingProductIds.filter((id: number) => id !== productId);
      }
    });
  }
  /**
   * Navigation innerhalb der Angular-Anwendung
   */
  private navigate(url: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(url);
    });
  }
}

