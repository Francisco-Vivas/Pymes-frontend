import { TextS } from "./styledComponents/Typography";
export default function OutOfStock({ sku }) {
  return (
    <div
      style={{
        backgroundColor: "#BF616A",
        color: "white",
        padding: "0.7rem",
        textAlign: "center",
        width: "100%",
        height: "auto",
        display: "flex",
        margin: "0.75rem 0",
      }}
    >
      <img
        src="/images/out.png"
        style={{ height: "25px", margin: "auto 2rem auto 1rem" }}
      />
      <TextS style={{ color: "white" }}>
        You are out of product <small>{sku}</small>
      </TextS>
    </div>
  );
}
