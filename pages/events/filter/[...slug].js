import { Fragment } from "react";
import Head from "next/head";

import { getFilteredEvents } from "../../../helpers/api-util";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const head = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All filtered events!`} />
    </Head>
  );

  if (props.error) {
    return (
      <Fragment>
        {head}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <Fragment>
        {head}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All filtered events for ${props.month}/${props.year}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export const getServerSideProps = async (context) => {
  const year = context.params.slug[0];
  const month = context.params.slug[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { error: true },
    };
  }

  const events = await getFilteredEvents({ year: numYear, month: numMonth });
  return { props: { filteredEvents: events, year: numYear, month: numMonth } };
};
