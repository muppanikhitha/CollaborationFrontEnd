'use strict';

app.factory('ChatChatForumService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("ChatForumService...")

			var BASE_URL = 'http://localhost:8020/CollaborationBackEnd'
				return {
				
				getSelectedChatChatForum : function(id) {
					console.log("-->ChatChatForumService : calling getSelectedChatChatForum() method with id : " + id);
					return $http
								.get(BASE_URL+'/chatforum/'+ id)
								.then(function(response) {
									$rootScope.selectedChatForum = response.data;
									return response.data;
								},
								function(errResponse) {
									console.error('Error while Fetching ChatForum.');
									return $q.reject(errResponse);
								});
				},
				
				fetchAllChatForums : function() {
					console.log("-->ChatForumService : calling 'fetchAllChatForums' method.");
					return $http
								.get(BASE_URL + '/chatforums')
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while fetching ChatForums');
									return $q.reject(errResponse);
								});
				},
				
				fetchAllChatForumComments : function(id) {
					console.log("-->ChatForumService : calling 'fetchAllChatForumComments' method for id : " + id);
					return $http
								.get(BASE_URL + '/chatforumComments/'+id)
								.then(function(response) {
									$rootScope.selectedChatForumComments = response.data;
									
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while fetching ChatForumComments');
									return $q.reject(errResponse);
								});
				},

				createChatForum : function(chatforum) {
					console.log("-->ChatChatForumService : calling 'createChatForum' method.");
					return $http
								.post(BASE_URL + '/chatforum/', chatforum)
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while creating chatforum');
									return $q.reject(errResponse);
								});
				},
				
				createChatForumComment : function(chatforumComment) {
					console.log("-->ChatForumService : calling 'createChatForumComment' method.");
					return $http
								.post(BASE_URL + '/chatforumComment/', chatforumComment)
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while creating chatforumComment');
									return $q.reject(errResponse);
								});
				},
				
				updateChatForum : function(chatforum, id) {
					console.log("-->ChatChatForumService : calling 'updateChatForum' method with id : "+id);
					return $http
								.put(BASE_URL+'/chatforum/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.error('Error while updating ChatForum');
									return $q.reject(errResponse);
								});
				},
				
				deleteChatForum : function(id) {
					console.log("-->ChatChatForumService : calling 'deleteChatForum' method with id : "+id);
					return $http
								.delete(BASE_URL+'/chatforum/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.log('Error while deleting ChatForum');
									return $q.reject(errResponse);
								});
				},
				
				likeChatForum : function(chatforum, id) {
					console.log("-->ChatChatForumService : calling 'likeChatForum' method : getting chatforum with id : " + id);
					return $http
								.put(BASE_URL+'/chatforum/likeChatForum/'+id, chatforum)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.log("Error while liking ChatForum.");
									return $q.reject(errResponse);
								});
				},
				
				countComment : function(chatforum, id) {
					console.log("-->ChatChatForumService : calling 'countComment' method : getting chatforum with id : " + id);
					return $http
								.put(BASE_URL+'/chatforum/countComment/'+id, chatforum)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.log("Error while liking ChatForum.");
									return $q.reject(errResponse);
								});
				}
				
			};
		} ]);