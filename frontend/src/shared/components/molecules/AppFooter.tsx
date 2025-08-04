import { Github, Linkedin } from 'lucide-react';

export const AppFooter = () => {
  return (
    <div className="flex justify-center items-start p-8 bg-secondary text-secondary-foreground mt-16 min-h-48">
      <div className="flex flex-row justify-between items-center w-full max-w-sm">
        <p>Created by Greg Yantz</p>
        <div className="flex flex-row justify-between items-center gap-4">
          <a
            href="https://www.linkedin.com/in/greg-yantz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            <Linkedin />
          </a>
          <a href="https://github.com/JustACodeMonkey" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};
