import Head from "next/head";
import { Jost } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useFlagsmith } from "flagsmith/react";


const jost = Jost({ subsets: ["latin"] });

export type User = {
  name: string;
  position: string;
};

export default function Home() {
  const [user, toggleUser] = useState<User>({
    name: "",
    position: "Freelancer",
  });

  const flagsmith = useFlagsmith()
  const router = useRouter();

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    toggleUser({
      ...user,
      name: e.target.value,
    });
  };

  const handleUserPosition = (e: ChangeEvent<HTMLSelectElement>) => {
    toggleUser({
      ...user,
      position: e.target.value,
    });
  };
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await flagsmith.setTrait("profession", user.position); // setting the "profession" trait as the one selected by user

    router.push({
      pathname: "/about",
      query: { name: user.name, position: user.position },
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`main-login ${jost.className}`}>
        <div className="login-box">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              onChange={handleUserName}
            />
            <select className="login-menu" onChange={handleUserPosition}>
              <option className="login-menu-item" defaultValue="Freelancer">
                Freelancer
              </option>
              <option className="login-menu-item" value="front-end developer">
                Front-end developer
              </option>
              <option className="login-menu-item" value="designer">
                Designer
              </option>
            </select>
            <button className="login-form-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
