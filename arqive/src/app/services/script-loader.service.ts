import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private loadedScripts: { [url: string]: boolean } = {};

  /**
   * Load a script asynchronously
   * @param url URL of the script to load
   * @param options Script options (like type, async, etc.)
   * @returns Observable that completes when the script is loaded
   */
  load(url: string, options: { [key: string]: string } = {}): Observable<Event> {
    // Return cached observable if script is already loading
    if (this.loadedScripts[url]) {
      return from(Promise.resolve(new Event('Already loaded')));
    }

    // Mark script as loading
    this.loadedScripts[url] = true;

    return from(
      new Promise<Event>((resolve, reject) => {
        // Create script element
        const script = document.createElement('script');
        script.src = url;
        
        // Add options to the script tag
        Object.keys(options).forEach(key => {
          script.setAttribute(key, options[key]);
        });

        // Set event handlers
        script.onload = (event: Event) => {
          resolve(event);
        };
        
        script.onerror = () => {
          this.loadedScripts[url] = false;
          reject(new Error(`Could not load script: ${url}`));
        };

        // Add to document
        document.body.appendChild(script);
      })
    );
  }
}
