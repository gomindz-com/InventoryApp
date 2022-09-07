/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";


function Author({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonBox mr={2}>
        <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
      </ArgonBox>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
        <ArgonTypography variant="caption" color="secondary">
          {email}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

function Function({ job, org }) {
  return (
    <ArgonBox display="flex" flexDirection="column">
      <ArgonTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </ArgonTypography>
      <ArgonTypography variant="caption" color="secondary">
        {org}
      </ArgonTypography>
    </ArgonBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "reference", align: "left" },
    { name: "order", align: "left" },
    { name: "courrier", align: "center" },
    { name: "date", align: "center" },
    
    { name: "action", align: "center" },
  ],

  rows: [
    {
      reference: <Function job="#63512631273313287" org="" />,
      order: (
        <ArgonBadge variant="gradient" badgeContent="MALi Serekunda" color="success" size="xs" container />
      ),
      courrier: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          Lamin Sonko Ent.
        </ArgonTypography>
      ),
      date: (
        <ArgonBadge variant="gradient" badgeContent="12/12/2022" color="fail" size="xs" container />
      ),
      action: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
    },
   
  ],
};

export default authorsTableData;
