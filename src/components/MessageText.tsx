import { Text } from "@react-three/drei";

const FONT_URL = "/fonts/NotoSansTC.woff";

// TODO: Customise the birthday message for your friend!
const BIRTHDAY_MESSAGE = "\u89aa\u611b\u7684\u670b\u53cb\uff0c\n\n\u795d\u4f60\u751f\u65e5\u5feb\u6a02\uff01\n\u9858\u4f60\u7684\u6bcf\u4e00\u5929\n\u90fd\u5145\u6eff\u611b\u8207\u559c\u6a02\u3002";

/**
 * Birthday message text, clipped to the card interior bounds.
 * clipRect prevents text from overflowing the card edges.
 */
export function MessageText() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.14}
      color="#2c3e50"
      font={FONT_URL}
      anchorX="center"
      anchorY="middle"
      maxWidth={1.2}
      textAlign="center"
      lineHeight={1.6}
      clipRect={[-0.7, -0.95, 0.7, 0.95]}
    >
      {BIRTHDAY_MESSAGE}
    </Text>
  );
}
