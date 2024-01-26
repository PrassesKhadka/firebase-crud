import Table from "./components/Table";
import Form from "./components/multistepForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4">
      <Form />
      <Table />
    </main>
  );
}
