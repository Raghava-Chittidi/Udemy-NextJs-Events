import { Fragment } from "react";
import Head from "next/head";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  if (!props.event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{props.event.title}</title>
        <meta name="description" content={props.event.description} />
      </Head>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date}
        address={props.event.location}
        image={props.event.image}
        imageAlt={props.event.title}
      />
      <EventContent>
        <p>{props.event.description}</p>
      </EventContent>
      <Comments eventId={props.event.id} />
    </Fragment>
  );
}

export default EventDetailPage;

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const eventIdList = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths: eventIdList,
    fallback: "blocking",
  };
};
