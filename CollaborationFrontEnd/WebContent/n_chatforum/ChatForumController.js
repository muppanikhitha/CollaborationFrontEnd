
'use strict';

app.controller('ChatForumController', [
		'$scope',
		'ChatForumService',
		'$location',
		'$rootScope',
		function($scope, ForumService, $location, $rootScope) {
			console.log("ChatForumController...")

			var self = this;
			self.chatforum = {
				id : '',
				description : '',
				post_date : '',
				userId : '',
				errorCode : '',
				errorMessage : '',
				countLike : '',
			    countComment : ''
			}
			self.chatforums = [];
			
			self.chatforumComment = {
				id : '',
				forumId : '',
				comment : '',
				userId : '',
				commentDate : '',
				errorCode : '',
				errorMessage : ''
			}			
			self.chatforumComments = [];

			self.getSelectedChatForum = function(id) {
				console.log("-->ChatForumController : calling getSelectedForum method with id : " + id);
				ChatForumService.getSelectedChatForum(id).then(function(d) {
					self.chatforum = d;
					
					console.log("test  "+d);
					//$location.path('/view_forum');
				}, function(errResponse) {
					console.error('Error while fetching Forum...');
				});
			};

			self.fetchAllChatForums = function() {
				console.log("-->ChatForumController : calling fetchAllForums method.");
				ChatForumService.fetchAllChatForums().then(function(d) {
					self.chatforums = d;
				}, function(errResponse) {
					console.error('Error while fetching Forums...');
				});
			};
			
			self.fetchAllForums();
			
			self.fetchAllChatForumComments = function(id) {
				console.log("-->ChatForumController : calling fetchAllForumComments method with id : "+ id);
				ChatForumService.fetchAllChatForumComments(id).then(function(d) {
					self.chatforumComments = d;
					
					self.getSelectedChatForum(id);		//calling getSelectedForum(id) method ...
					$location.path('/view_chatforum');
				}, function(errResponse) {
					console.error('Error while fetching ChatForumComments...');
				});
			};

			self.createChatForum = function(Chatforum) {
				console.log("-->ChatForumController : calling createForum method.");
				ChatForumService.createForum(forum).then(function(d) {
					self.chatforum = d;
					alert('ChatForum Created Successfully...')
				},
						function(errResponse) {
							console.error('Error while creating chatforum...');
						});
			};
			
			self.createChatForumComment = function(ChatforumComment, id) {
				console.log("-->ChatForumController : calling 'createForumComment' method.", self.forum);
				chatforumComment.chatforumId = id;
				console.log("-->ChatForumController ForumId :" +chatforumComment.chatforumId);
				ForumService
							.createChatForumComment(ChatforumComment)
							.then(function(d) {
								self.chatforumComment = d;
								console.log('-->ChatForumController :', self.chatforumComment)
								self.fetchAllChatForumComments(id);
								self.resetComment();
							},
							function(errResponse) {
								console.error('Error while creating chatforumComment...');
							});
			};

			self.updateChatForum = function(Chatforum, id) {
				console.log("-->ChatForumController : calling updateForum method.");
				ChatForumService.updateChatForum(chatforum).then(self.fetchAllChatForums,
						function(errResponse) {
							console.error('Error while updating chatforum...')
						});
			};

			self.deleteChatForum = function(id) {
				console.log("-->ChatForumController : calling deleteForum method.");
				ChatForumService.deleteChatForum(id).then(self.fetchAllChatForums,
						function(errResponse) {
							console.error('Error while deleting chatforum...')
						});
			};
			
			self.likeChatForum = function(Chatforum, id) {
				console.log("-->ChatForumController : calling likeChatForum() method. ChatForum id is : "+id);
				console.log("-->ChatForumController", self.chatforum);
				ChatForumService.likeChatForum(Chatforum, id).then(
						self.fetchAllForums,
						function(errResponse) {
							console.error("Error while liking the chatforum...");
						});
			};
			
			self.countComment = function(chatforum, id) {
				console.log("-->ChatForumController : calling countComment() method. ChatForum id is : "+id);
				console.log("-->ChatForumController", self.Chatforum);
				ChatForumService.countComment(Chatforum, id).then(
						self.fetchAllChatForums,
						function(errResponse) {
							console.error("Error while commenting on a chatforum...");
						});
			};
			

	/*****************************************************************************/
			
			self.submit = function() {
				{
					console.log("-->ChatForumController : calling submit() method.", self.chatforum);
					self.createChatForum(self.chatforum);
					console.log('Saving new ChatForum', self.chatforum);
				}
				self.reset();
			};
			
			self.edit = function(id) {
				console.log('id to be edited', id);
				for (var i = 0; i < self.chatforums.length; i++) {
					if (self.chatforums[i].id === id) {
						self.chatforum = angular.copy(self.chatforums[i]);
						break;
					}
				}
			};
			
			self.remove = function(id) {
				console.log('id to be deleted', id);
				if (self.chatforum.id === id) {
					self.reset();
				}
				self.deleteChatForum(id);
			};

			self.reset = function() {
				console.log('submit a new ChatForum', self.chatforum);
				self.chatforum = {
						id : '',
						description : '',
						post_date : '',
						userId : '',
						errorCode : '',
						errorMessage : ''
				};
				$scope.myChatForm.$setPristine(); // reset form...
			};
			
			self.resetComment = function() {
				console.log('submit a new ChatForumComment', self.ChatforumComment);
				self.ChatforumComment = {
						id : '',
						chatforumId : '',
						comment : '',
						userId : '',
						commentDate : '',
						errorCode : '',
						errorMessage : ''
					};
				$scope.myChatForm.$setPristine(); // reset form...
			};
		} ]);
