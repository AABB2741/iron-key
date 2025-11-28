import { GithubIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="p-12 text-center border-t border-border flex flex-col items-center gap-6">
      <p>&copy; 2025 IronKey. Código aberto e gratuito.</p>
      <nav>
        <ul>
          <li>
            <a href="https://github.com/AABB2741/iron-key" target="_blank">
              <GithubIcon />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
