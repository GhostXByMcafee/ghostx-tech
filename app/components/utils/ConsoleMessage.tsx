'use client';

import { useEffect } from 'react';

export default function ConsoleMessage() {
  useEffect(() => {
    const devtoolsDetector = () => {
      const threshold = 160;
      const emitEvent = (isOpen: boolean) => {
        if (isOpen && !window.devtoolsOpen) {
          window.devtoolsOpen = true;
          showConsoleMessage();
        }
      };

      window.addEventListener('resize', () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        emitEvent(widthThreshold || heightThreshold);
      });

      if (/Chrome/.test(navigator.userAgent)) {
        const devtools = /./;
        devtools.toString = function() {
          window.devtoolsOpen = true;
          showConsoleMessage();
          return '';
        };
        console.log('%c', devtools);
      }
    };

    const showConsoleMessage = () => {
      const style = 'color: #f24023; font-weight: bold; font-size: 12px; font-family: monospace;';
      
      console.log(`%c
       @@@@@@                                                                                                                            
    @@@@    @@@@                                                                                                                         
@@@@@          @@@@@                                                                                                                     
@@@@@@            @@@@@@                                                                                                                 
@@   @@@@@             @@@@              @@@@@@@@@@@@@@                                           @@@@@       @@@@@@  @@@@@@             
@@      @@@@@@            @@@            @@@@@@@@@@@@@@@@@                                        @@@@@     @@@@@@@   @@@@@@    @@@@@    
@@      @@  @@@@@@        @@@            @@@@@@@@@@@@@@@@@@@                                      @@@@@    @@@@@@       @@@     @@@@@    
@@      @@       @@@      @@@            @@@@@@       @@@@@@@     @@@@@@@@@@   @@@@@@     @@@@@   @@@@@  @@@@@@      @@@@@@@ @@@@@@@@@@@@
@@      @@        @@      @@@            @@@@@@         @@@@@@  @@@@@@@@@@@@@@   @@@@@   @@@@@    @@@@@ @@@@@@       @@@@@@@ @@@@@@@@@@@@
@@      @@        @@      @@@            @@@@@@         @@@@@@ @@@@@@    @@@@@@   @@@@@ @@@@@@    @@@@@@@@@@@          @@@@@    @@@@@    
@@      @@        @@      @@@            @@@@@@         @@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@      @@@@@@@@@@@@@        @@@@@    @@@@@    
@@      @@        @@      @@@            @@@@@@         @@@@@ @@@@@@@@@@@@@@@@@    @@@@@@@@@      @@@@@  @@@@@@@       @@@@@    @@@@@    
@@      @@       @@@      @@@            @@@@@@       @@@@@@@  @@@@@              @@@@@@@@@@@     @@@@@    @@@@@@@     @@@@@    @@@@@    
@@      @@  @@@@@@        @@@            @@@@@@@@@@@@@@@@@@@   @@@@@@@   @@@@@@  @@@@@@ @@@@@@    @@@@@     @@@@@@@    @@@@@    @@@@@@@@@
@@      @@@@@@            @@@            @@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@  @@@@@@    @@@@@   @@@@@       @@@@@@@  @@@@@     @@@@@@@@
@@      @@            @@@@@               @@@@@@@@@@@@@           @@@@@@@@@@   @@@@@@      @@@@@  @@@@@        @@@@@@@ @@@@@      @@@@@@@
@@      @@        @@@@@@                                                                                                                 
@@@@    @@    @@@@@@                                                                                                                     
   @@@@ @@ @@@@@                                                                                                                         
      @@@@@@                                                                                                                             
`, style);

      console.log('%c"Internet privacy is a myth. Total anonymity is the only truth." - John McAfee', 'color: #FF5733; font-size: 14px; font-weight: bold;');
      console.log('%cghostX - Inspired by John McAfee\'s vision of digital freedom', 'color: #888; font-size: 12px;');
    };

    if (typeof window !== 'undefined' && !window.devtoolsOpen) {
      window.devtoolsOpen = false;
      devtoolsDetector();
      
      if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
        showConsoleMessage();
        window.devtoolsOpen = true;
      }
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    devtoolsOpen: boolean;
  }
} 