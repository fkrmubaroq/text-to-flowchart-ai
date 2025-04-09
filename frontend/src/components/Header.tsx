
import React from 'react';
import { GitHubLogoIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full border-b py-3">
      <div className="container flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-xl tracking-tight flex items-center">
            <span className="text-flow-purple mr-1">Flow</span>
            <span className="text-flow-blue">Scribe</span>
          </div>
          <span className="hidden sm:inline-block text-sm text-muted-foreground">
            Simple text to flowchart converter
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <a 
              href="https://github.com/mermaid-js/mermaid" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
