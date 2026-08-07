import { ColorRing, Bars } from "react-loader-spinner";

export function CircleLoader() {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#515961"]}
    />
  );
}

export function BasrLoader() {
  return (
    <div className="flex justify-center">
      <Bars
        height="20"
        width="20"
        color="#8b8d8f"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
