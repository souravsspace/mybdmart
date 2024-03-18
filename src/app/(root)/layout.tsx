import { type PropsWithChildren } from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/footer";
import { env } from "@/env";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }: PropsWithChildren) {
  const GMT_ID = env.GOOGLE_TAG_MANAGER_ID;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section>{children}</section>
        <GoogleTagManager gtmId={GMT_ID} />
      </main>
      <Footer />
    </main>
    // <>
    //   <head>
    //     <script
    //       async
    //       src={`https://www.googletagmanager.com/gtm.js?id=${GMT_ID}`}
    //     />
    //     <script
    //       dangerouslySetInnerHTML={{
    //         __html: `
    //             window.dataLayer = window.dataLayer || [];
    //             function gtag() {
    //               dataLayer.push(arguments);
    //             }
    //             gtag('js', new Date());
    //             gtag('config', '${GMT_ID}'), {
    //               page_path: window.location.pathname,
    //             }
    //         `,
    //       }}
    //     />
    //   </head>
    //   <body>
    // <main className="flex min-h-screen flex-col">
    //   <Navbar />
    //   <main className="flex-grow">{children}</main>
    //   <Footer />
    // </main>
    // </body>
    // </>
  );
}
