import Header from "./components/Header";
import Footer from "./components/Footer";
import Bookmark from "./components/Bookmark";

/**
 * 框架主界面
 */
export default function App() {
  return (
    <>
      <Header className="page-framework mt-8" />
      <Bookmark className="page-framework my-8" />
      <Footer className="page-framework mb-8" />
    </>
  );
}
