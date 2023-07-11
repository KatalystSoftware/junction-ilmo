import { Header } from "@/components/header";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-start bg-[url('./junction2023-bg.webp')] bg-cover">
        <main className="relative flex w-full flex-1 flex-col gap-6 bg-background/80 px-12 py-6">
          <h3 className="text-center text-2xl uppercase">Basic Details</h3>
          <form>
            <p className="flex flex-col items-center bg-foreground p-6 text-background">
              <label
                className="text-lg font-bold text-background/60"
                htmlFor="first-name"
              >
                First name
              </label>
              <input
                className="self-stretch border-b py-2 outline-none hover:border-b-2 focus-visible:border-b-2 focus-visible:border-primary"
                id="first-name"
                type="text"
                placeholder="First name"
              />
            </p>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
