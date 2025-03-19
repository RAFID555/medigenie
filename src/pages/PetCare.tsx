
import Layout from "@/components/Layout";

const PetCare = () => {
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">পেট কেয়ার</h1>
          <p className="text-muted-foreground">
            আপনার প্রিয় পোষা প্রাণীর যত্ন নিন
          </p>
        </div>
        
        <div className="grid gap-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">পেট কেয়ার সার্ভিসের জন্য অপেক্ষা করুন</h2>
            <p>আমরা শীঘ্রই আপনার প্রিয় পোষা প্রাণীর জন্য বিশেষ পরিষেবা নিয়ে আসছি।</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PetCare;
