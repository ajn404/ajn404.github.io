import Mouse from "./mouse";

function App() {
  return (
    <div>
      <p>Move the mouse around!</p>
      <Mouse
        render={({ x, y }) => (
          <p style={{ fontWeight: "bold" }}>
            The current mouse position is ({x}, {y})
          </p>
        )}
      />
    </div>
  );
}

export default App;
