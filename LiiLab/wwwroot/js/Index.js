window.onload = function () {

    LoadPostList();
    console.log("sdbs");
};

function LoadPostList() {

    $.ajax({
        url: "/Home/GetPostList",
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data.success) {
                console.log('Successfully');
                AppendPostList(data.list);

            } else
                alert("Can't Load Now!");
        },
        error: function (xhr, status, error) {
            alert('An error occurred while submitting the post.');
        }
    });
}

function WritePost() {
    var post = document.getElementById("inputPost");

    $.ajax({
        url: "/Home/WritePost",
        dataType: "json",
        type: "POST",
        data: { post: post.value },
        success: function (data) {
            if (data.success) {
                console.log('Successfully');
                appendPost(data.post)
                post.value = '';
            } else
                alert("Can't Add Now!");
        },
        error: function (xhr, status, error) {
            alert('An error occurred while submitting the post.');
        }
    });
}

function AppendPostList(data) {
    data.forEach(item => {
        appendPost(item);
    });
}

function appendPost(item)
{
    var post = document.getElementById("postSection");

    let postContainer = document.createElement('div');
        postContainer.className = 'post-container';

        postContainer.innerHTML = `
        <div class="post-header">
        <img src="/Icon/profile.png" alt="Profile Picture" class="profile-pic">
        <strong>${item.userName}</strong>
    </div>
    <div class="post-content">
       ${item.content}
    </div>
    <div class="post-actions">
        <div class="post-action-btn" id="like${item.postId}" onclick="handleLikeClick('like${item.postId}',${item.postId})">
            <img src="/Icon/thumb-up.png" alt="Like">
            Like ${item.likes}
        </div>
        <div class="post-action-btn" onclick="handleCommentClick('commentSection${item.postId}',${item.postId})">
            <img src="/Icon/comments.png" alt="Comment">
            Comment
        </div>
    </div>
    <div class="comment-section" id="commentSection${item.postId}">
        <div class="add-comment">
            <img src="/Icon/profile.png" alt="Profile Picture" class="comment-profile-pic">
            <input type="text" class="comment-input" placeholder="Write a comment..." id="commentInput${item.postId}">
            <button class="comment-btn" id="addComment${item.postId}" onclick="addComment('commentInput${item.postId}',${item.postId})">Comment</button>
        </div>
        <div class="comments-list" id="commentList${item.postId}">
        </div>
    </div>`;

        post.appendChild(postContainer);
        item.comment.forEach(comment => {
            appendComment(item.postId,comment)
        });
}

function appendComment(postId, item)
{
    let commentList = document.getElementById(`commentList${postId}`);
   commentList.insertAdjacentHTML('beforeend', `
            <div class="comment" id="comment${item.id}">
                <img src="/Icon/profile.png" alt="Profile Picture" class="comment-profile-pic">
                <div class="comment-content">
                    <strong>${item.userName}</strong>
                    <p>${item.content}</p>
                </div>
            </div>`);
}

async function handleLikeClick(id, postId) {
    try {
        await UpdateLike(postId);
        const updatedLikeCount = await GetLikeNumber(postId);
        document.getElementById(id).innerHTML = ` <img src="/Icon/thumb-up.png" alt="Like"> Like ${updatedLikeCount}`;
    } catch (error) {
        console.error('Error updating like:', error);
    }
}

function UpdateLike(postId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/Home/UpdateLike",
            dataType: "json",
            type: "POST",
            data: { postId: postId },
            success: function (data) {
                if (data.success) {
                    console.log('Successfully');
                    resolve();
                } else {
                    alert("Can't Add Now!");
                    reject(new Error("Failed to update like"));
                }
            },
            error: function (xhr, status, error) {
                alert('An error occurred while submitting the post.');
                reject(error);
            }
        });
    });
}

function GetLikeNumber(postId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/Home/GetLikeNumber",
            dataType: "json",
            type: "GET",
            data: { postId: postId },
            success: function (data) {
                if (data.success) {
                    console.log('Successfully');
                    resolve(data.like);  // Resolve with the updated like number
                } else {
                    alert("Can't Get Data!");
                    reject(new Error("Failed to get like number"));
                }
            },
            error: function (xhr, status, error) {
                alert('Error happened');
                reject(error);
            }
        });
    });
}
function handleCommentClick(id, postId) {
    var commentSection = document.getElementById(id);

    if (commentSection.style.display == 'block') {
        commentSection.style.display = 'none';
    } else {
        commentSection.style.display = 'block';
    }
}

function addComment(id, postId) {
    var content = document.getElementById(id);

    $.ajax({
        url: "/Home/PostComment",
        dataType: "json",
        type: "Post",
        data: { postId: postId, content: content.value },
        success: function (data) {
            if (data.success) {
                console.log('Successfully');
                var commentList = document.getElementById(`commentList${postId}`);

                commentList.innerHTML += `<div class="comment" id="comment${data.comment.id}">
                <img src="/Icon/profile.png" alt="Profile Picture" class="comment-profile-pic">
                  <div class="comment-content">
                    <strong>${data.comment.userName}</strong>
                    <p>${data.comment.content}</p>
                  </div>
                </div>`
                content.value = '';

            } else {
                alert("Can't Get Data!");
                //   reject(new Error("Failed to get like number"));
            }
        },
        error: function (xhr, status, error) {
            alert('Error happened');
            //  reject(error);
        }
    });
}