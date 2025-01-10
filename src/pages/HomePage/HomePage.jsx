import DocumentTitle from '../../components/DocumentTitle';


export default function HomePage() {
  return (
    <>
      <DocumentTitle>HomePage</DocumentTitle>

      <div>
        <h1>
          Welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}
