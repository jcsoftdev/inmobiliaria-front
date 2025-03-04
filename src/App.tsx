import "./App.css";

import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import { Footer, Header, Layout, Sidebar } from "@components/layout";
import { AgenciesModule } from "@components/modules/agencies";
import { Dashboard } from "@components/modules/dashboard";
import { LoginsModule } from "@components/modules/login";
import { PropertiesModule } from "@components/modules/properties";
import PropertyForm from "@components/modules/properties/property-form";

import { isLogedIn } from "./auth/auth";

const client = new QueryClient();

const Router = () => {
  const location = useLocation();
  const background = location.state?.background;
  const hasAuth = isLogedIn();
  console.log({ background });
  return (
    <>
      {!hasAuth ? (
        <Routes location={background || location}>
          <Route path="login" element={<LoginsModule />} />
        </Routes>
      ) : (
        <Layout footer={Footer} header={Header} sidebar={Sidebar}>
          <Routes location={background || location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="properties" element={<PropertiesModule />} />
            <Route path="agencia" element={<AgenciesModule />} />
          </Routes>

          {/* Renderizar el modal encima si hay un background */}
          {background && (
            <Routes>
              <Route path="agencia/register" element={<PropertyForm />} />
              <Route path="properties/register" element={<PropertyForm />} />
            </Routes>
          )}
        </Layout>
      )}
    </>
  );
};
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HeroUIProvider>
          {createPortal(<ToastProvider placement="top-right" />, document.body)}
          <Router />
        </HeroUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
