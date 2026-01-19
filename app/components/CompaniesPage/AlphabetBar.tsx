interface AlphabetBarProps {
  activeLetter: string | null;
  onLetterClick: (letter: string | null) => void;
  availableLetters: Set<string>;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetBar = ({
  activeLetter,
  onLetterClick,
  availableLetters,
}: AlphabetBarProps) => {
  return (
    <div className="sticky top-20 z-40 -mx-4 bg-background/95 px-4 py-3 backdrop-blur-sm border-b border-border">
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        <button
          onClick={() => onLetterClick(null)}
          className={`rounded-md px-2 py-1 font-mono text-xs transition-all ${
            activeLetter === null
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          All
        </button>
        {alphabet.map((letter) => {
          const isAvailable = availableLetters.has(letter);
          return (
            <button
              key={letter}
              onClick={() => isAvailable && onLetterClick(letter)}
              disabled={!isAvailable}
              className={`rounded-md px-2 py-1 font-mono text-xs transition-all ${
                activeLetter === letter
                  ? "bg-primary text-primary-foreground"
                  : isAvailable
                    ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    : "cursor-not-allowed text-muted-foreground/30"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlphabetBar;
