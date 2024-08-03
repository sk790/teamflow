"use client";

import { useOrganizationList } from "@clerk/nextjs";
import OrgItems from "./OrgItems";

const OrgList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length) return null;
  return (
    <ul className="space-y-1">
      {userMemberships.data?.map((member) => (
        <OrgItems key={member.organization.id} {...member.organization}/>
      ))}
    </ul>
  );
};

export default OrgList;
