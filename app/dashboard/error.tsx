'use client';
// must be client component will be caught at
// runtime with error boundries
// reset comes out of the box, it re-renders the page inside the error boundary
const DashboardError = ({ error, reset }) => {
  return (
    <div className="h-full flex flex-col items-center justify-evenly">
      <h2>Something went wrong :(</h2>
      {/* <p>Error message: {error.message}</p> */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default DashboardError;
