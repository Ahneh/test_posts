import {
  Delete,
  Edit,
  CompareArrows,
  ReplyAll,
  Send,
  Add,
  Close,
} from "@material-ui/icons";

export const ICONS = {
  delete: (color) => <Delete htmlColor={color} />,
  send: (color) => <Send htmlColor={color} />,
  compare: (color) => <CompareArrows htmlColor={color} />,
  add: (color) => <Add htmlColor={color} />,
  list: (color) => <ReplyAll htmlColor={color} />,
  edit: (color) => <Edit htmlColor={color} />,
  close: (color) => <Close htmlColor={color} />,
};
