import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface LinkEmailProps {
    token?: string;
  }
  

  export const LinkEmail = ({
    token,
  }: LinkEmailProps) => (
    <Html>
      <Head />
      <Preview>Log in with this link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Login</Heading>
          <Link
            href={`${process.env.APP_URL}/verify-email?token=${token}`}
            target="_blank"
            style={{
              ...link,
              display: "block",
              marginBottom: "16px",
            }}
          >
            Click here to verify your email
          </Link>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>

          <Text style={{
              ...text,
              marginTop: "14px",
              marginBottom: "16px",
            }}>
            your logo here
        </Text>

          <Text style={footer}>
            <Link
              href="https://nizzyabi.com"
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              yoururl.com
            </Link>
            , learn to code
            <br />
            && have fun doing it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
 LinkEmail.PreviewProps = {
    loginCode: "sparo-ndigo-amurt-secan",
  } as LinkEmailProps;
  
  export default LinkEmail;
  
  const main = {
    backgroundColor: "#ffffff",
  };
  
  const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
  };
  
  const h1 = {
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
  };
  
  const link = {
    color: "#2754C5",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  };
  
  const text = {
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
  };
  
  const footer = {
    color: "#898989",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    lineHeight: "22px",
    marginTop: "12px",
    marginBottom: "24px",
  };
  
  const code = {
    display: "inline-block",
    padding: "16px 4.5%",
    width: "90.5%",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    border: "1px solid #eee",
    color: "#333",
  };
  