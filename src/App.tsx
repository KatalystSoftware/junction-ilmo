import { ArrowLeft, ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 flex w-full justify-center gap-4 bg-background p-2 uppercase">
        <h1 className="font-bold">Register</h1>
        <h2>Junction 2023</h2>
      </header>
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
      </div>
      <footer className="fixed bottom-0 z-40 flex w-full justify-between bg-background p-2">
        <button className="flex items-center gap-1 rounded-lg px-6 py-1 font-bold">
          <ArrowLeft className="h-4 w-4" />
          <span>Back: ...</span>
        </button>
        <button className="flex items-center gap-1 rounded-lg bg-primary px-6 py-1 font-bold text-primary-foreground">
          <span>Next: ...</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}

export default App;
