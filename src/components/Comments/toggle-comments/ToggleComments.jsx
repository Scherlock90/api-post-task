import React from 'react';

export default function ToggleComments({ isActive, activeComments, toggleModal }) {
  return (
    <div className='container-for-buttons-commments'>
      <div className='uk-card uk-card-body main-cards-posts-left'>
        <h3 className='uk-card-title cont-button'>
          <span
            className='icon-add-comments'
            uk-icon={
              isActive ? 'icon:  arrow-up; ratio: 2' : 'icon:  arrow-down; ratio: 2'
            }
            onClick={activeComments}
          ></span>
          <div className='title-button-add-comment'>
            {isActive ? 'Hide comments' : 'Show Commments'}
          </div>
        </h3>
      </div>
      <div>
        <div className='uk-card uk-card-body main-cards-posts-right'>
          <h3 className='uk-card-title cont-button'>
            <span
              className='icon-add-comments'
              uk-icon='icon:  plus-circle; ratio: 2'
              onClick={toggleModal}
            ></span>
            <div className='title-button-add-comment'>Add Comment</div>
          </h3>
        </div>
      </div>
    </div>
  );
}
