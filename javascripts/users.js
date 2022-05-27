var main = function (UsersObjects) {
	"use strict";
	var $input = $("<input>").addClass("input-name"),
		$butRegister = $("<button>").text("4-Создать аккаунт").addClass("authorization-4"),
		$butLogin = $("<button>").text("3-Войти в аккаунт").addClass("authorization-3"),
		$butEdit = $("<button>").text(" 2-Изменить имя пользователя").addClass("authorization-2"),
		$butDestroy = $("<button>").text("1-Удалить пользователя").addClass("authorization-1");
	

	$butRegister.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var newUser = {"username": username};
			$.post("users", newUser, function(result) {
				console.log(result);
				//UsersObjects.push(newUser);
			}).done(function(response) {
				console.log(response);
				alert('Аккаунт создан! Нажмите "Войти", чтобы продолжить')
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				if (jqXHR.status === 501) {
					alert("Такой пользователь уже существует!");
				} else {					
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				}
			});
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butLogin.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var loginUser = {"username": username};
			$.ajax({
				'url': '/users/' + username,
				'type': 'GET'
			}).done(function(response) {
				window.location.replace('users/' + username + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
			});
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butEdit.on("click", function() {
		if ($input.val() !== null && $input.val().trim() !== "") {
			var username = $input.val();
			var newUsername = prompt("Введите новое имя пользователя", $input.val());
			if (newUsername !== null && newUsername.trim() !== "") {
				$.ajax({
					'url': '/users/' + username,
					'type': 'PUT',
					'data': { 'username': newUsername }
				}).done(function(responde) {
					console.log(responde);
					$input.val(newUsername);
					alert('Имя пользователя успешно изменено');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$butDestroy.on("click", function() {
		if ($input.val() !== null && $input.val().trim() !== "") {
			var username = $input.val();
			if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
				$.ajax({
					'url': '/users/' + username,
					'type': 'DELETE',
				}).done(function(responde) {
					console.log(responde);
					$input.val("");
					alert('Пользователь успешно удален');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Ошибка!" + jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
		else
			alert("Неудачное имя пользователя!");
	});

	$("main .authorization").append($input);
	$("main .authorization").append('<br>');
	$("main .authorization").append($butDestroy);
	$("main .authorization").append($butEdit);
	$("main .authorization").append('<br>');
	$("main .authorization").append($butLogin);
	$("main .authorization").append($butRegister);

}

$(document).ready(function() {
	$.getJSON("users.json", function (UsersObjects) {
		main(UsersObjects);
	});
});