
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint } from "lucide-react";

const PetCare = () => {
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bangla">পেট কেয়ার</h1>
          <p className="text-muted-foreground bangla">
            আপনার প্রিয় পোষা প্রাণীর যত্ন নিন
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold bangla">
                পেট কেয়ার সার্ভিসের জন্য অপেক্ষা করুন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bangla">আমরা শীঘ্রই আপনার প্রিয় পোষা প্রাণীর জন্য বিশেষ পরিষেবা নিয়ে আসছি।</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PetCare;
