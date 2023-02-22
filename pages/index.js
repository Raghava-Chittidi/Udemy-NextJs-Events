import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Featured Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return { props: { featuredEvents: featuredEvents }, revalidate: 1800 };
};
