import OrgSelector from '../../../../shared/components/OrgSelector/OrgSelector'

function Header() {
  return (
    <div className="flex items-center justify-center bg-neutral w-screen h-24">
      <OrgSelector />
    </div>
  );
}

export default Header;
