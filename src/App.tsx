import { Header } from "@/components/header";
import { Footer } from "./components/footer";
import { FormRow } from "./components/form-row";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-start bg-[url('./junction2023-bg.webp')] bg-cover">
        <main className="relative flex w-full flex-1 flex-col gap-6 overflow-y-auto bg-background/80 px-12 pb-24 pt-6">
          <h3 className="text-center text-2xl uppercase">Basic Details</h3>
          <form>
            <FormRow
              id="first-name"
              name="first-name"
              label="First Name"
              placeholder="First Name"
            />
            <FormRow
              id="last-name"
              name="last-name"
              label="Last Name"
              placeholder="Last Name"
            />
            <FormRow
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
            />
            <FormRow
              id="phone-number"
              name="phone-number"
              type="tel"
              label="Phone Number"
              placeholder="Phone Number"
            />
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
