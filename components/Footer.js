export default function Footer() {
  return (
    <footer style={{ marginTop: "2rem", padding: "1rem", borderTop: "1px solid #eee", textAlign: "center" }}>
      © {new Date().getFullYear()} Created With ❤️ By <a href="https://github.com/iamvisshu" target="_blank">@iamvisshu</a>
    </footer>
  );
}
