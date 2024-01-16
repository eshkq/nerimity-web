import { formatTimestamp } from "@/common/date";
import Marked from "@/components/marked/Marked";
import { useAppVersion } from "@/common/useAppVersion";
import { A } from "@solidjs/router";
import Button from "./ui/Button";
import { FlexColumn } from "./ui/Flexbox";
import Modal from "./ui/modal/Modal";
import Text from "./ui/Text";

export function ChangelogModal (props: {close: () => void}) {
  const {latestRelease} = useAppVersion(); 
  
  const date = () => {
    const release = latestRelease();
    if (!release) return undefined;
    return formatTimestamp(new Date(release.published_at).getTime())
  }

  const ActionButtons = (
    <A style={{"text-decoration": "none"}} href="https://github.com/Nerimity/Nerimity-Web/releases" target="_blank" rel="noopener noreferrer">
      <Button label="View more in GitHub" iconName="launch"  />
    </A>
  )


  return (
    <Modal title="Changelog" close={props.close} actionButtons={ActionButtons} >
      <FlexColumn gap={5}>
        <FlexColumn style={{"max-height": "400px", "max-width": "600px", overflow: "auto", padding: "5px"}}>
          <Text size={24}>{latestRelease()?.name || ""}</Text>
          <Text opacity={0.7}>Released at {date() || ""}</Text>
          <Text opacity={0.7}>{latestRelease()?.tag_name}</Text>
          <Marked value={latestRelease()?.body!} />
        </FlexColumn>
      </FlexColumn>
    </Modal>
  )
}