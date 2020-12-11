import { TextS } from "./styledComponents/Typography";
export default function LowInventory({ sku }) {
  return (
    <div
      style={{
        backgroundColor: "#EBCB8B",
        padding: "0.7rem",
        textAlign: "center",
        width: "100%",
        height: "auto",
        display: "flex",
        margin: "0.75rem 0",
      }}
    >
      <img
        src="/images/alert.png"
        style={{ height: "25px", margin: "auto 2rem auto 1rem" }}
      />
      <TextS style={{ color: "white" }}>
        Product{" "}
        <b>
          <small>{sku}</small>
        </b>{" "}
        is running low
      </TextS>
    </div>
  );
}
