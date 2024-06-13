type LoadGoogleMapsScriptOptions = {
    apiKey: string;
    libraries?: string[];
    callback: () => void;
}

const loadGoogleMapsScript = ({ apiKey, libraries = [], callback }: LoadGoogleMapsScriptOptions): void => {
    // Check if the script is already loaded
    if (typeof window !== "undefined" && (window as any).google && (window as any).google.maps) {
        callback();
        return;
    }

    // Create a script tag to add to the document
    const script = document.createElement('script');
    script.type = 'text/javascript';

    // Construct the URL for loading the Google Maps script
    const baseUrl = 'https://maps.googleapis.com/maps/api/js';
    const params = [
        `key=${apiKey}`,
        `libraries=${libraries.join(',')}`,
        `callback=initGoogleMaps`
    ];
    script.src = `${baseUrl}?${params.join('&')}`;

    // Append the script tag to the document's head
    document.head.appendChild(script);

    // Attach callback function to the window object
    (window as any).initGoogleMaps = () => {
        callback();
        // Clean up: remove the global init function once it's called
        delete (window as any).initGoogleMaps;
    };

    // Error handling if Google Maps fails to load
    script.onerror = () => {
        console.error('Google Maps failed to load!');
        // Optionally, handle failures (e.g., display a notification)
    };
}

export default loadGoogleMapsScript
