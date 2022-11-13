function Footer() {
  return (
    <footer className="page-footer transparent">
      <div className="footer-copyright grey darken-4">
        <div className="container white-text">
          {new Date().getFullYear()} © Made with ❤ by Игорь Тимонин
          <a className="white-text right" href="https://t.me/IgorTimonin">Telegram</a>
          <a className="white-text right" href="https://github.com/IgorTimonin">Github</a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
