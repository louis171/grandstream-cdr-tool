import React from "react";

const userCallerTooltip = () => {
  return (
    <span>
      Filters a specific Caller Number or a range of Caller Numbers via Comma
      separated extensions, ranges of extensions, or regular expressions. For
      example:
      <br />
      <ul>
        <li>
          <b>02079460000-02079460003,02079460005</b> - Matches 02079460000,
          02079460001, 02079460002, 02079460003, 02079460005.
        </li>
        <li>
          <b>07@</b> - Matches any UK mobile number.
        </li>
      </ul>
      Patterns containing one or more wildcards ('@' or '_') will match as a
      regular expression, and treat '-' as a literal hyphen rather than a range
      signifier.
      <br />
      <br />
      The '@' wildcard matches any number of characters (including zero), while
      '_' matches any single character. Otherwise, patterns containing a single
      hyphen will be matching a range of numerical extensions, with
      non-numerical characters ignored, while patterns containing multiple
      hyphens will be ignored. (The pattern "0-0" will match all non-numerical
      and empty strings).
    </span>
  );
};

const extensionGroupTooltip = () => {
  return (
    <span>
      Proivides a selectable list of extension groups returned from your
      Grandstream UCM
    </span>
  );
};

const userCalleeTooltip = () => {
  return (
    <span>
      Filters a specific Callee Number or a range of Callee Numbers via Comma
      separated extensions, ranges of extensions, or regular expressions. For
      example:
      <br />
      <ul>
        <li>
          <b>5300,5302-5304</b> - Matches extensions 5300, 5302, 5303, 5304.
        </li>
        <li>
          <b>_4@</b> - Matches any extension containing 4 as the second digit.
        </li>
      </ul>
      Patterns containing one or more wildcards ('@' or '_') will match as a
      regular expression, and treat '-' as a literal hyphen rather than a range
      signifier.
      <br />
      <br />
      The '@' wildcard matches any number of characters (including zero), while
      '_' matches any single character. Otherwise, patterns containing a single
      hyphen will be matching a range of numerical extensions, with
      non-numerical characters ignored, while patterns containing multiple
      hyphens will be ignored. (The pattern "0-0" will match all non-numerical
      and empty strings).
    </span>
  );
};

const userAnsweredByTooltip = () => {
  return (
    <span>
      Filters a specific Callee Number or a range of Callee Numbers via Comma
      separated extensions, ranges of extensions, or regular expressions. For
      example:
      <br />
      <ul>
        <li>
          <b>5300,5302-5304</b> - Matches extensions 5300, 5302, 5303, 5304.
        </li>
        <li>
          <b>_4@</b> - Matches any extension containing 4 as the second digit.
        </li>
      </ul>
      Patterns containing one or more wildcards ('@' or '_') will match as a
      regular expression, and treat '-' as a literal hyphen rather than a range
      signifier.
      <br />
      <br />
      The '@' wildcard matches any number of characters (including zero), while
      '_' matches any single character. Otherwise, patterns containing a single
      hyphen will be matching a range of numerical extensions, with
      non-numerical characters ignored, while patterns containing multiple
      hyphens will be ignored. (The pattern "0-0" will match all non-numerical
      and empty strings).
    </span>
  );
};

const userMinDurationTooltip = () => {
  return (
    <span>
      Filters based in a minimum Billable duration in seconds. For example:
      <br />
      <ul>
        <li>
          <b>10</b> - Only returns CDR entries with a Billable Duration of 10
          seconds or above.
        </li>
      </ul>
    </span>
  );
};

const userMaxDurationTooltip = () => {
  return (
    <span>
      Filters based in a maximum Billable duration in seconds. For example:
      <br />
      <ul>
        <li>
          <b>10</b> - Only returns CDR entries with a Billable Duration of 10
          seconds or less.
        </li>
      </ul>
    </span>
  );
};

const Tooltips = {
  userCallerTooltip: userCallerTooltip,
  extensionGroupTooltip: extensionGroupTooltip,
  userCalleeTooltip: userCalleeTooltip,
  userAnsweredByTooltip: userAnsweredByTooltip,
  userMinDurationTooltip: userMinDurationTooltip,
  userMaxDurationTooltip: userMaxDurationTooltip,
};

export default Tooltips;
