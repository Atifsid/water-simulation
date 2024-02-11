import Containers from "./component/Containers";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="m-10 text-4xl">WATER SIMULATION</div>
      <Containers />
    </main>
  );
}
