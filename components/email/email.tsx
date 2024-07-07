import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  

  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const RepoEmail = () => (
    <Html>
      <Head />
      <Preview>
        Your Free SaaS Starter Kit
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="170"
            height="50"
            alt="Nizzy"
            style={logo}
          />
          <Text style={paragraph}>Hey!!</Text>
          <Text style={paragraph}>
            Welcome to the Nizzy Starter Kit!! The free (and better) SaaS Starter Kit.
          </Text>
          <Text style={paragraph}>
            Below is the link to the github repository where you can find the starter kit.
          </Text>
          <Text style={paragraph}>
            Enjoy building your next project with it!
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://github.com/NizarAbiZaher/nizzy-starter">
              Go To The Starter Kit
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Nizzy
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            470 Noor Ave STE B #1148, Ottawa, Canada 94080
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default RepoEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: 'black'
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#1F8EEF",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };