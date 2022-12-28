import { BlackLogo } from "../Logos/BlackLogo";


const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL

const privacyPolicyUrl = `${WEB_URL}/privacy_policy`
const communityGuidelinesUrl = `${WEB_URL}/community_guidelines`
const dmcaCopyrightPolicyUrl = `${WEB_URL}/dmca_copyright_policy`
const termsOfServicesUrl = `${WEB_URL}/terms_of_services`

export const Footer = () => {
  return (
    <footer className="p-6 footer h-22 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-content footer-center">
      <div>
        <div className="grid grid-flow-col gap-4">
          <BlackLogo />
        </div>
        <a href={privacyPolicyUrl}><p className="text-blue">Privacy Policy</p></a>
        <a href={communityGuidelinesUrl}><p className="text-blue">Community Guidelines</p></a>
        <a href={dmcaCopyrightPolicyUrl}><p className="text-blue">DMCA Copyright Policy</p></a>
        <a href={termsOfServicesUrl}><p className="text-blue">Terms of Service</p></a>
      </div>
    </footer>
  );
};
