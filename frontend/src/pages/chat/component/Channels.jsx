import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { changeChannel, channelsSelector, channelIdSelector } from '../../../redux/slices/channelsSlice.js';
import DeleteChannel from './DeletedChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const Channels = () => {
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const dispatch = useDispatch();

  const handleActiveChannel = (e) => {
    dispatch(changeChannel(Number(e.target.id)));
  };

  return (
    channels.map((channel, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="nav-item w-100" key={index}>
        <Dropdown className="w-100" as={ButtonGroup}>
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant="secondary"
            id={channel.id}
            active={currentChannelId !== channel.id}
            onClick={handleActiveChannel}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>

          {channel.removable
        && (
        <Dropdown.Toggle className="br-0" split variant="light" id="dropdown-split-basic">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        )}

          <Dropdown.Menu>
            <DeleteChannel id={channel.id} />
            <RenameChannel id={channel.id} />
          </Dropdown.Menu>
        </Dropdown>
      </li>
    ))
  );
};

export default Channels;
