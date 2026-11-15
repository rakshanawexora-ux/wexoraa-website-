export default function Loading() {
  return (
    <div className="route-loading" role="status">
      <div className="loading-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
        <b>W</b>
      </div>
      <p>Making room for your next idea…</p>
    </div>
  );
}
