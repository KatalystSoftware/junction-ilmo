import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Form } from "@/components/form";
import { useStage } from "@/components/stage-provider";

function App() {
  const { currentStage, onPassStage } = useStage();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-start bg-[url('./junction2023-bg.webp')] bg-cover">
        <main className="relative flex w-full flex-1 flex-col items-center gap-6 overflow-y-auto bg-background/80 px-12 pb-24 pt-6">
          <h3 className="text-center text-2xl uppercase">
            {currentStage.label}
          </h3>
          <Form onPassStage={onPassStage} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
