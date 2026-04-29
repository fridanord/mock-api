// import LogRegComponent from "../components/LogRegComponent";

// export type Mode = "login" | "register";

// type AuthShellProps = {
//   mode: Mode;
// };

// export default function AuthShell({ mode }: AuthShellProps) {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-8">
//       <LogRegComponent mode={mode} />
//       {/* Placeholder welcome message; LÄGG TILL CONTENT EFTER LOGIN/REGCOMP EFTER HÄR */}
//       <section className="w-full max-w-md mt-8 text-center">
//         <h1 className="text-4xl font-bold text-white mb-4">
//           Välkommen till API Playground
//         </h1>
//       </section>
//       <section className="w-full max-w-md h-[800px] bg-amber-400 mt-4 text-center">
//         {" "}
//       </section>
//     </section>
//   );
// }

import LogRegComponent from "../components/LogRegComponent";
import AuthInfoCards from "../components/authInfoCards/AuthInfoCards";

export type Mode = "login" | "register";

type AuthShellProps = {
  mode: Mode;
};

export default function AuthShell({ mode }: AuthShellProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-8">
      <LogRegComponent mode={mode} />
      <AuthInfoCards />
    </section>
  );
}
