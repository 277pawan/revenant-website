import { Routes, Route } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { DocsLayout } from "./components/docs/DocsLayout";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { CliPage } from "./pages/CliPage";
import { TalkPage } from "./pages/TalkPage";
import { CoffeePage } from "./pages/CoffeePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { OAuthCompletePage } from "./pages/OAuthCompletePage";
import { DocsIndexPage } from "./pages/DocsIndexPage";
import { DocsModulePage } from "./pages/DocsModulePage";
import { TrialEndedPage } from "./pages/TrialEndedPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="cli" element={<CliPage />} />
        <Route path="talk" element={<TalkPage />} />
        <Route path="coffee" element={<CoffeePage />} />
        <Route path="trial-ended" element={<TrialEndedPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="auth/oauth/complete" element={<OAuthCompletePage />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIndexPage />} />
          <Route path=":sectionId/:moduleSlug" element={<DocsModulePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
