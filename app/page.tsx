import type { NextPage } from "next";
import EmotionForm from "../components/Form";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <main className="container mx-auto px-4">
        <EmotionForm />
      </main>
    </div>
  );
};

export default Home;
