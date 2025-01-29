import { useState, useEffect } from "preact/hooks";

const readableFont = "Cardo, serif";
const medievalFont = "Old English Text MT, UnifrakturMaguntia, serif";

export default function ReadableFontToggle() {
  const [isReadable, setIsReadable] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Natychmiastowe ustawienie czcionki w head, aby uniknąć efektu migania
  if (typeof window !== "undefined" && isReadable === null) {
    const savedFont = localStorage.getItem("fontPreference");
    const isReadableStored = savedFont === "readable";
    document.body.style.fontFamily = isReadableStored
      ? readableFont
      : medievalFont;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFont = localStorage.getItem("fontPreference");
      setIsReadable(savedFont === "readable");
      setTimeout(() => setIsLoaded(true), 200); // Opóźnienie wyświetlenia tekstu
    }
  }, []);

  const toggleFont = () => {
    const newReadable = !isReadable;
    setIsReadable(newReadable);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "fontPreference",
        newReadable ? "readable" : "medieval"
      );
      document.body.style.fontFamily = newReadable
        ? readableFont
        : medievalFont;
    }
  };

  if (isReadable === null) return null;

  return (
    <div
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <button
        onClick={toggleFont}
        style={{
          background: "linear-gradient(to bottom, #6b0000, #4b0000)",
          color: "#fff",
          border: "3px solid #3e2f1d",
          padding: "10px 20px",
          fontFamily: "UnifrakturMaguntia, Old English Text MT, serif",
          fontSize: "1.2em",
          cursor: "pointer",
          borderRadius: "10px",
          transition: "transform 0.2s ease-in-out, background 0.3s ease-in-out",
        }}
      >
        {isReadable ? "Przywróć średniowieczną czcionkę" : "Nie umiem czytać"}
      </button>
    </div>
  );
}
