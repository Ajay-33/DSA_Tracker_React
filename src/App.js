import './App.css';
import React, { useContext } from 'react'
import Categories from './components/Categories';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Questions from './components/Questions';
import QuestionsContext from './context/questions/QuestionsContext';

function App() {

  // const data = [
  //   {
  //     "_id": "65c0a77fc67648630cf82279",
  //     "category_name": "Heaps",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=hW8PrQrvMNc&list=PL_z_8CaSLPWdtY9W22VjnPxG30CXNZpI9"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e6c1a3c09758ed29552c",
  //         "question_name": "Kth Largest Element in an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/kth-largest-element-in-an-array/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/kth-largest-element-in-an-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29552d",
  //         "question_name": "Last Stone Weight",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/last-stone-weight/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/last-stone-weight/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29552e",
  //         "question_name": "Top K Frequent Elements",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/top-k-frequent-elements/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/top-k-frequent-elements/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29552f",
  //         "question_name": "Merge k Sorted Lists",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/merge-k-sorted-lists/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-k-sorted-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295530",
  //         "question_name": "Find Median from Data Stream",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/find-median-from-data-stream/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-median-from-data-stream/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295531",
  //         "question_name": "Sliding Window Maximum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/sliding-window-maximum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sliding-window-maximum/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295532",
  //         "question_name": "Minimum Cost to Hire K Workers",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295533",
  //         "question_name": "Ugly Number II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/ugly-number-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/ugly-number-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295534",
  //         "question_name": "Sort Characters By Frequency",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/sort-characters-by-frequency/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sort-characters-by-frequency/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295535",
  //         "question_name": "Find K Pairs with Smallest Sums",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295536",
  //         "question_name": "Super Ugly Number",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/super-ugly-number/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/super-ugly-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295537",
  //         "question_name": "Task Scheduler",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/task-scheduler/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/task-scheduler/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295538",
  //         "question_name": "Minimum Number of Refueling Stops",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-number-of-refueling-stops/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-number-of-refueling-stops/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed295539",
  //         "question_name": "Find Median from Data Stream",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/find-median-from-data-stream/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-median-from-data-stream/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29553a",
  //         "question_name": "Trapping Rain Water II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/trapping-rain-water-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/trapping-rain-water-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29553b",
  //         "question_name": "Find the Most Competitive Subsequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/find-the-most-competitive-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-most-competitive-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29553c",
  //         "question_name": "Kth Smallest Element in a Sorted Matrix",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29553d",
  //         "question_name": "Sliding Window Median",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/sliding-window-median/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sliding-window-median/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.704Z",
  //         "updatedAt": "2024-02-05T13:46:41.704Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e6c1a3c09758ed29553e",
  //         "question_name": "Concave Polygon",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/concave-polygon/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/concave-polygon/"
  //         ],
  //         "createdAt": "2024-02-05T13:46:41.705Z",
  //         "updatedAt": "2024-02-05T13:46:41.705Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:46:41.718Z",
  //     "__v": 1
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf8227a",
  //     "category_name": "Binary Trees",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=_ANrF3FJm7I&list=PLkjdNRgDmcc0Pom5erUBU4ZayeU9AyRRu"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e729a3c09758ed295567",
  //         "question_name": "Maximum Depth of Binary Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-depth-of-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed295568",
  //         "question_name": "Invert Binary Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/invert-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/invert-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed295569",
  //         "question_name": "Binary Tree Level Order Traversal",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-level-order-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556a",
  //         "question_name": "Symmetric Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/symmetric-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/symmetric-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556b",
  //         "question_name": "Path Sum",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/path-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/path-sum/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556c",
  //         "question_name": "Lowest Common Ancestor of a Binary Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556d",
  //         "question_name": "Diameter of Binary Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/diameter-of-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/diameter-of-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556e",
  //         "question_name": "Convert Sorted Array to Binary Search Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed29556f",
  //         "question_name": "Balanced Binary Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/balanced-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/balanced-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e729a3c09758ed295570",
  //         "question_name": "Same Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/same-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/same-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:48:25.192Z",
  //         "updatedAt": "2024-02-05T13:48:25.192Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295587",
  //         "question_name": "Binary Tree Zigzag Level Order Traversal",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295588",
  //         "question_name": "Flatten Binary Tree to Linked List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295589",
  //         "question_name": "Populating Next Right Pointers in Each Node",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558a",
  //         "question_name": "Binary Tree Maximum Path Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-maximum-path-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558b",
  //         "question_name": "Construct Binary Tree from Inorder and Postorder Traversal",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558c",
  //         "question_name": "Binary Tree Right Side View",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-right-side-view/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-right-side-view/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558d",
  //         "question_name": "Binary Tree Level Order Traversal II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558e",
  //         "question_name": "Binary Tree Preorder Traversal",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-preorder-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-preorder-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed29558f",
  //         "question_name": "Binary Tree Postorder Traversal",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-postorder-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-postorder-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295590",
  //         "question_name": "Binary Tree Inorder Traversal",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-inorder-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295591",
  //         "question_name": "Binary Tree Paths",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-paths/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-paths/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e76fa3c09758ed295592",
  //         "question_name": "Lowest Common Ancestor of a Binary Search Tree",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:49:35.250Z",
  //         "updatedAt": "2024-02-05T13:49:35.250Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a1",
  //         "question_name": "Binary Tree Maximum Product",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-maximum-product/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-maximum-product/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a2",
  //         "question_name": "Binary Tree Vertical Order Traversal",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-vertical-order-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-vertical-order-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a3",
  //         "question_name": "Binary Tree Longest Consecutive Sequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a4",
  //         "question_name": "Binary Tree Cameras",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-cameras/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-cameras/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a5",
  //         "question_name": "Binary Tree Maximum Path Sum III",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-maximum-path-sum-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-maximum-path-sum-iii/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a6",
  //         "question_name": "Binary Tree Cameras",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-cameras/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-cameras/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a7",
  //         "question_name": "Binary Tree Vertical Order Traversal II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-vertical-order-traversal-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-vertical-order-traversal-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a8",
  //         "question_name": "Binary Tree Zigzag Level Order Traversal II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955a9",
  //         "question_name": "Construct Binary Tree from Preorder and Inorder Traversal",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955aa",
  //         "question_name": "Serialize and Deserialize Binary Tree",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955ab",
  //         "question_name": "Binary Tree Maximum Path Sum IV",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-maximum-path-sum-iv/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-maximum-path-sum-iv/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955ac",
  //         "question_name": "Distribute Coins in Binary Tree",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/distribute-coins-in-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/distribute-coins-in-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955ad",
  //         "question_name": "Binary Tree Longest Consecutive Sequence II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e7bca3c09758ed2955ae",
  //         "question_name": "Binary Tree Maximum Path Sum V",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-maximum-path-sum-v/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-maximum-path-sum-v/"
  //         ],
  //         "createdAt": "2024-02-05T13:50:52.843Z",
  //         "updatedAt": "2024-02-05T13:50:52.843Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.349Z",
  //     "updatedAt": "2024-02-05T13:50:52.852Z",
  //     "__v": 3
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf8227b",
  //     "category_name": "Graphs",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=M3_pLsDdeuU&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955bf",
  //         "question_name": "Breadth First Search (BFS)",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/breadth-first-search/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/breadth-first-search/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c0",
  //         "question_name": "Depth First Search (DFS)",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/depth-first-search/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/depth-first-search/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c1",
  //         "question_name": "Island Perimeter",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/island-perimeter/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/island-perimeter/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c2",
  //         "question_name": "Number of Islands",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/number-of-islands/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-islands/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c3",
  //         "question_name": "Course Schedule",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/course-schedule/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/course-schedule/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c4",
  //         "question_name": "Clone Graph",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/clone-graph/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/clone-graph/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c5",
  //         "question_name": "Valid Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/graph-valid-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/graph-valid-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c6",
  //         "question_name": "Graph Connectivity with Threshold",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/graph-connectivity-with-threshold/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/graph-connectivity-with-threshold/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c7",
  //         "question_name": "Climbing Stairs",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/climbing-stairs/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/climbing-stairs/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c8",
  //         "question_name": "Symmetric Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/symmetric-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/symmetric-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955c9",
  //         "question_name": "Graph Valid Tree",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/graph-valid-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/graph-valid-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955ca",
  //         "question_name": "Word Ladder",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/word-ladder/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/word-ladder/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955cb",
  //         "question_name": "Perfect Squares",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/perfect-squares/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/perfect-squares/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955cc",
  //         "question_name": "Detect Cycle in an Undirected Graph",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/detect-cycle-in-an-undirected-graph/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/detect-cycle-in-an-undirected-graph/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8aaa3c09758ed2955cd",
  //         "question_name": "Graph Connectivity with Threshold",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/graph-connectivity-with-threshold/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/graph-connectivity-with-threshold/"
  //         ],
  //         "createdAt": "2024-02-05T13:54:50.322Z",
  //         "updatedAt": "2024-02-05T13:54:50.322Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955ee",
  //         "question_name": "Network Delay Time",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/network-delay-time/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/network-delay-time/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955ef",
  //         "question_name": "Reconstruct Itinerary",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/reconstruct-itinerary/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/reconstruct-itinerary/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f0",
  //         "question_name": "Cheapest Flights Within K Stops",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/cheapest-flights-within-k-stops/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f1",
  //         "question_name": "Alien Dictionary",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/alien-dictionary/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/alien-dictionary/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f2",
  //         "question_name": "Perfect Rectangle",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/perfect-rectangle/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/perfect-rectangle/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f3",
  //         "question_name": "Find the Town Judge",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-the-town-judge/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-town-judge/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f4",
  //         "question_name": "Minimum Height Trees",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-height-trees/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-height-trees/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f5",
  //         "question_name": "All Paths From Source to Target",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/all-paths-from-source-to-target/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/all-paths-from-source-to-target/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f6",
  //         "question_name": "Redundant Connection",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/redundant-connection/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/redundant-connection/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f7",
  //         "question_name": "Evaluate Division",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/evaluate-division/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/evaluate-division/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f8",
  //         "question_name": "Graph Valid Tree",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/graph-valid-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/graph-valid-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955f9",
  //         "question_name": "Shortest Path Visiting All Nodes",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/shortest-path-visiting-all-nodes/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955fa",
  //         "question_name": "Critical Connections in a Network",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/critical-connections-in-a-network/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/critical-connections-in-a-network/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955fb",
  //         "question_name": "Number of Connected Components in an Undirected Graph",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955fc",
  //         "question_name": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955fd",
  //         "question_name": "Find the Celebrity",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-the-celebrity/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-celebrity/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955fe",
  //         "question_name": "Friend Circles",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/friend-circles/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/friend-circles/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed2955ff",
  //         "question_name": "Word Search",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/word-search/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/word-search/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e8fba3c09758ed295600",
  //         "question_name": "Accounts Merge",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/accounts-merge/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/accounts-merge/"
  //         ],
  //         "createdAt": "2024-02-05T13:56:11.997Z",
  //         "updatedAt": "2024-02-05T13:56:11.997Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295616",
  //         "question_name": "Number of Islands II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/number-of-islands-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-islands-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.061Z",
  //         "updatedAt": "2024-02-05T13:57:09.061Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295617",
  //         "question_name": "Word Ladder II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/word-ladder-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/word-ladder-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295618",
  //         "question_name": "Shortest Path in Binary Matrix",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/shortest-path-in-binary-matrix/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295619",
  //         "question_name": "Number of Connected Components in an Undirected Graph II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561a",
  //         "question_name": "Minimum Area Rectangle II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-area-rectangle-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-area-rectangle-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561b",
  //         "question_name": "Shortest Path with Alternating Colors",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/shortest-path-with-alternating-colors/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/shortest-path-with-alternating-colors/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561c",
  //         "question_name": "Couples Holding Hands",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/couples-holding-hands/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/couples-holding-hands/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561d",
  //         "question_name": "Number of Ways to Reorder Array to Get Same BST",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561e",
  //         "question_name": "Time Needed to Inform All Employees",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/time-needed-to-inform-all-employees/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/time-needed-to-inform-all-employees/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed29561f",
  //         "question_name": "Crab Graph",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/crab-graph/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/crab-graph/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295620",
  //         "question_name": "Minimum Moves to Move a Box to Target",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-moves-to-move-a-box-to-target/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-moves-to-move-a-box-to-target/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295621",
  //         "question_name": "Minimum Cost to Connect Two Groups of Points",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295622",
  //         "question_name": "Sentence Similarity III",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/sentence-similarity-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sentence-similarity-iii/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295623",
  //         "question_name": "Escape a Large Maze",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/escape-a-large-maze/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/escape-a-large-maze/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295624",
  //         "question_name": "Bus Routes",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/bus-routes/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/bus-routes/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295625",
  //         "question_name": "Minimum Number of Refueling Stops",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-number-of-refueling-stops/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-number-of-refueling-stops/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295626",
  //         "question_name": "Shortest Path in a Grid with Obstacles Elimination",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295627",
  //         "question_name": "Minimum Cost to Make at Least One Valid Path in a Grid",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295628",
  //         "question_name": "Minimum Moves to Move a Box to Target",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-moves-to-move-a-box-to-target/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-moves-to-move-a-box-to-target/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e935a3c09758ed295629",
  //         "question_name": "Binary Tree Cameras",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/binary-tree-cameras/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-tree-cameras/"
  //         ],
  //         "createdAt": "2024-02-05T13:57:09.062Z",
  //         "updatedAt": "2024-02-05T13:57:09.062Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.349Z",
  //     "updatedAt": "2024-02-05T13:57:09.080Z",
  //     "__v": 3
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf8227c",
  //     "category_name": "D.P",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=tyB0ztf0DNY&list=PLg0aancPZwRazLXPEW-vu517p3gXVCn0b"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e9afa3c09758ed295640",
  //         "question_name": "Climbing Stairs",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/climbing-stairs/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/climbing-stairs/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295641",
  //         "question_name": "Fibonacci Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/fibonacci-number/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/fibonacci-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295642",
  //         "question_name": "Min Cost Climbing Stairs",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/min-cost-climbing-stairs/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/min-cost-climbing-stairs/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295643",
  //         "question_name": "Maximum Subarray",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-subarray/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-subarray/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295644",
  //         "question_name": "Best Time to Buy and Sell Stock",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295645",
  //         "question_name": "House Robber",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/house-robber/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/house-robber/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295646",
  //         "question_name": "Decode Ways",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/decode-ways/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-ways/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295647",
  //         "question_name": "Unique Paths",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/unique-paths/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295648",
  //         "question_name": "Coin Change",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/coin-change/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/coin-change/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed295649",
  //         "question_name": "Longest Increasing Subsequence",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/longest-increasing-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-increasing-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed29564a",
  //         "question_name": "Climbing Stairs",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/climbing-stairs/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/climbing-stairs/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed29564b",
  //         "question_name": "Maximum Product Subarray",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-product-subarray/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-product-subarray/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed29564c",
  //         "question_name": "Unique Paths II",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/unique-paths-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed29564d",
  //         "question_name": "Minimum Path Sum",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/minimum-path-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-path-sum/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9afa3c09758ed29564e",
  //         "question_name": "Maximum Product of Two Elements in an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:59:11.788Z",
  //         "updatedAt": "2024-02-05T13:59:11.788Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed29566f",
  //         "question_name": "Longest Palindromic Substring",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-palindromic-substring/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-palindromic-substring/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295670",
  //         "question_name": "Word Break",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/word-break/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/word-break/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295671",
  //         "question_name": "Unique Paths III",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/unique-paths-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths-iii/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295672",
  //         "question_name": "Jump Game",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/jump-game/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/jump-game/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295673",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295674",
  //         "question_name": "Maximum Length of Repeated Subarray",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/maximum-length-of-repeated-subarray/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-length-of-repeated-subarray/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.173Z",
  //         "updatedAt": "2024-02-05T14:00:15.173Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295675",
  //         "question_name": "Counting Bits",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/counting-bits/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/counting-bits/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295676",
  //         "question_name": "Minimum Path Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-path-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-path-sum/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295677",
  //         "question_name": "House Robber II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/house-robber-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/house-robber-ii/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295678",
  //         "question_name": "Word Break II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/word-break-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/word-break-ii/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed295679",
  //         "question_name": "Decode Ways",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/decode-ways/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-ways/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed29567a",
  //         "question_name": "Count Square Submatrices with All Ones",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/count-square-submatrices-with-all-ones/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed29567b",
  //         "question_name": "Partition Equal Subset Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/partition-equal-subset-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/partition-equal-subset-sum/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed29567c",
  //         "question_name": "Longest Increasing Subsequence",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-increasing-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-increasing-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e9efa3c09758ed29567d",
  //         "question_name": "Best Time to Buy and Sell Stock III",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/"
  //         ],
  //         "createdAt": "2024-02-05T14:00:15.174Z",
  //         "updatedAt": "2024-02-05T14:00:15.174Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed29568f",
  //         "question_name": "Longest Increasing Subsequence",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-increasing-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-increasing-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295690",
  //         "question_name": "Unique Paths",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/unique-paths/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295691",
  //         "question_name": "Longest Palindromic Subsequence",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-palindromic-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-palindromic-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295692",
  //         "question_name": "Minimum Path Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-path-sum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-path-sum/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295693",
  //         "question_name": "Coin Change 2",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/coin-change-2/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/coin-change-2/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295694",
  //         "question_name": "Jump Game",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/jump-game/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/jump-game/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295695",
  //         "question_name": "Unique Paths III",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/unique-paths-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths-iii/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295696",
  //         "question_name": "Combination Sum II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/combination-sum-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/combination-sum-ii/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295697",
  //         "question_name": "Decode Ways",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/decode-ways/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-ways/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ea70a3c09758ed295698",
  //         "question_name": "Maximal Square",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/maximal-square/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximal-square/"
  //         ],
  //         "createdAt": "2024-02-05T14:02:24.512Z",
  //         "updatedAt": "2024-02-05T14:02:24.512Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956a5",
  //         "question_name": "Edit Distance",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/edit-distance/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/edit-distance/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956a6",
  //         "question_name": "Distinct Subsequences",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/distinct-subsequences/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/distinct-subsequences/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956a7",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956a8",
  //         "question_name": "Longest Valid Parentheses",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-valid-parentheses/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-valid-parentheses/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956a9",
  //         "question_name": "Regular Expression Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/regular-expression-matching/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/regular-expression-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956aa",
  //         "question_name": "Count Palindromic Subsequences",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/count-palindromic-subsequences/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/count-palindromic-subsequences/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956ab",
  //         "question_name": "Longest Increasing Subsequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-increasing-subsequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-increasing-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956ac",
  //         "question_name": "Minimum Window Substring",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-window-substring/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-window-substring/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956ad",
  //         "question_name": "Decode Ways",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/decode-ways/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-ways/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956ae",
  //         "question_name": "Shortest Common Supersequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/shortest-common-supersequence/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/shortest-common-supersequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956af",
  //         "question_name": "Counting Bits",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/counting-bits/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/counting-bits/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956b0",
  //         "question_name": "Minimum Number of Arrows to Burst Balloons",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956b1",
  //         "question_name": "Cherry Pickup",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/cherry-pickup/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/cherry-pickup/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956b2",
  //         "question_name": "Minimum ASCII Delete Sum for Two Strings",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956b3",
  //         "question_name": "Concatenated Words",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/concatenated-words/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/concatenated-words/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0eb62a3c09758ed2956b4",
  //         "question_name": "N-Queens II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/n-queens-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/n-queens-ii/"
  //         ],
  //         "createdAt": "2024-02-05T14:06:26.150Z",
  //         "updatedAt": "2024-02-05T14:06:26.150Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.349Z",
  //     "updatedAt": "2024-02-05T14:06:26.159Z",
  //     "__v": 4
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82271",
  //     "category_name": "Arrays",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=AT14lCXuMKI&list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU"
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:25:10.649Z",
  //     "__v": 6,
  //     "questions": [
  //       {
  //         "_id": "65c0dff9a3c09758ed29535c",
  //         "question_name": "Reverse an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/reverse-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.202Z",
  //         "updatedAt": "2024-02-05T13:17:45.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed29535d",
  //         "question_name": "Find the Maximum Element in an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-element-in-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-element-in-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.202Z",
  //         "updatedAt": "2024-02-05T13:17:45.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed29535e",
  //         "question_name": "Rotate Array to the Right by K Steps",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/rotate-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/rotate-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed29535f",
  //         "question_name": "Sum of Two Arrays",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/sum-of-two-arrays/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/sum-of-two-arrays/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295360",
  //         "question_name": "Merge Two Sorted Arrays",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/merge-sorted-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-sorted-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295361",
  //         "question_name": "Remove Duplicates from Sorted Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295362",
  //         "question_name": "Find All Numbers Disappeared in an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295363",
  //         "question_name": "Single Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/single-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/single-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295364",
  //         "question_name": "Move Zeroes",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/move-zeroes/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/move-zeroes/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295365",
  //         "question_name": "Max Consecutive Ones",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/max-consecutive-ones/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/max-consecutive-ones/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295366",
  //         "question_name": "Valid Mountain Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-mountain-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-mountain-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.203Z",
  //         "updatedAt": "2024-02-05T13:17:45.203Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295367",
  //         "question_name": "Remove Element",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/remove-element/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-element/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.204Z",
  //         "updatedAt": "2024-02-05T13:17:45.204Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295368",
  //         "question_name": "Third Maximum Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/third-maximum-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/third-maximum-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.204Z",
  //         "updatedAt": "2024-02-05T13:17:45.204Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed295369",
  //         "question_name": "Find the Duplicate Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/find-the-duplicate-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-duplicate-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.204Z",
  //         "updatedAt": "2024-02-05T13:17:45.204Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0dff9a3c09758ed29536a",
  //         "question_name": "Product of Array Except Self",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/product-of-array-except-self/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/product-of-array-except-self/"
  //         ],
  //         "createdAt": "2024-02-05T13:17:45.204Z",
  //         "updatedAt": "2024-02-05T13:17:45.204Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed29538b",
  //         "question_name": "3Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/3sum/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/3sum/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed29538c",
  //         "question_name": "Maximum Subarray",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/maximum-subarray/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-subarray/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed29538d",
  //         "question_name": "Next Permutation",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/next-permutation/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/next-permutation/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed29538e",
  //         "question_name": "Combination Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/combination-sum/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/combination-sum/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed29538f",
  //         "question_name": "Jump Game",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/jump-game/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/jump-game/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295390",
  //         "question_name": "Spiral Matrix",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/spiral-matrix/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/spiral-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295391",
  //         "question_name": "Product of Three Numbers",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/product-of-three-numbers/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/product-of-three-numbers/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295392",
  //         "question_name": "Three Sum Closest",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/3sum-closest/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/3sum-closest/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295393",
  //         "question_name": "Longest Increasing Subsequence",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-increasing-subsequence/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-increasing-subsequence/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295394",
  //         "question_name": "Container With Most Water",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/container-with-most-water/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/container-with-most-water/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295395",
  //         "question_name": "Search a 2D Matrix",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/search-a-2d-matrix/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-a-2d-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295396",
  //         "question_name": "Find First and Last Position of Element in Sorted Array",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e0d1a3c09758ed295397",
  //         "question_name": "Merge Intervals",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/merge-intervals/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-intervals/"
  //         ],
  //         "createdAt": "2024-02-05T13:21:21.622Z",
  //         "updatedAt": "2024-02-05T13:21:21.622Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953a7",
  //         "question_name": "Trapping Rain Water",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/trapping-rain-water/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/trapping-rain-water/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953a8",
  //         "question_name": "Longest Consecutive Sequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-consecutive-sequence/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-consecutive-sequence/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953a9",
  //         "question_name": "First Missing Positive",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/first-missing-positive/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/first-missing-positive/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953aa",
  //         "question_name": "Maximum Product Subarray",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/maximum-product-subarray/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-product-subarray/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953ab",
  //         "question_name": "Find the Duplicate Number",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/find-the-duplicate-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-duplicate-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953ac",
  //         "question_name": "Median of Two Sorted Arrays",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/median-of-two-sorted-arrays/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953ad",
  //         "question_name": "Product of Array Except Self",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/product-of-array-except-self/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/product-of-array-except-self/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953ae",
  //         "question_name": "Minimum Window Substring",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-window-substring/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-window-substring/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953af",
  //         "question_name": "Jump Game II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/jump-game-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/jump-game-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b0",
  //         "question_name": "Longest Valid Parentheses",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-valid-parentheses/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-valid-parentheses/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b1",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b2",
  //         "question_name": "Substring with Concatenation of All Words",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b3",
  //         "question_name": "Valid Number",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/valid-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b4",
  //         "question_name": "Best Time to Buy and Sell Stock III",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e1b6a3c09758ed2953b5",
  //         "question_name": "Candy",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/candy/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/candy/"
  //         ],
  //         "createdAt": "2024-02-05T13:25:10.642Z",
  //         "updatedAt": "2024-02-05T13:25:10.642Z",
  //         "__v": 0
  //       }
  //     ]
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82272",
  //     "category_name": "Binary Search",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=_NT69eLpqks&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e2dba3c09758ed2953c7",
  //         "question_name": "Binary Search",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/binary-search/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/binary-search/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953c8",
  //         "question_name": "Search Insert Position",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/search-insert-position/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-insert-position/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953c9",
  //         "question_name": "First Bad Version",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/first-bad-version/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/first-bad-version/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953ca",
  //         "question_name": "Sqrt(x)",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/sqrtx/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/sqrtx/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953cb",
  //         "question_name": "Guess Number Higher or Lower",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/guess-number-higher-or-lower/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/guess-number-higher-or-lower/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953cc",
  //         "question_name": "Peak Index in a Mountain Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/peak-index-in-a-mountain-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953cd",
  //         "question_name": "Find Smallest Letter Greater Than Target",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/find-smallest-letter-greater-than-target/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-smallest-letter-greater-than-target/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953ce",
  //         "question_name": "Arranging Coins",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/arranging-coins/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/arranging-coins/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.555Z",
  //         "updatedAt": "2024-02-05T13:30:03.555Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953cf",
  //         "question_name": "Valid Perfect Square",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-perfect-square/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-perfect-square/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d0",
  //         "question_name": "Guess Number Higher or Lower II",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/guess-number-higher-or-lower-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/guess-number-higher-or-lower-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d1",
  //         "question_name": "Find the Duplicate Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/find-the-duplicate-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-duplicate-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d2",
  //         "question_name": "Intersection of Two Arrays",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/intersection-of-two-arrays/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/intersection-of-two-arrays/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d3",
  //         "question_name": "Search in Rotated Sorted Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/search-in-rotated-sorted-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d4",
  //         "question_name": "Search a 2D Matrix",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/search-a-2d-matrix/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-a-2d-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e2dba3c09758ed2953d5",
  //         "question_name": "Valid Mountain Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-mountain-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-mountain-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:03.556Z",
  //         "updatedAt": "2024-02-05T13:30:03.556Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953f6",
  //         "question_name": "Search in Rotated Sorted Array II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953f7",
  //         "question_name": "Find Minimum in Rotated Sorted Array",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953f8",
  //         "question_name": "Search a 2D Matrix II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/search-a-2d-matrix-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/search-a-2d-matrix-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953f9",
  //         "question_name": "Kth Smallest Element in a Sorted Matrix",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953fa",
  //         "question_name": "Smallest Rectangle Enclosing Black Pixels",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953fb",
  //         "question_name": "Count Negative Numbers in a Sorted Matrix",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953fc",
  //         "question_name": "Find the Duplicate Number",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/find-the-duplicate-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-duplicate-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953fd",
  //         "question_name": "Koko Eating Bananas",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/koko-eating-bananas/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/koko-eating-bananas/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953fe",
  //         "question_name": "Minimum Number of Days to Make m Bouquets",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e30ca3c09758ed2953ff",
  //         "question_name": "Capacity To Ship Packages Within D Days",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
  //         ],
  //         "createdAt": "2024-02-05T13:30:52.431Z",
  //         "updatedAt": "2024-02-05T13:30:52.431Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e319a3c09758ed29540c",
  //         "question_name": "Median of Two Sorted Arrays",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/median-of-two-sorted-arrays/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  //         ],
  //         "createdAt": "2024-02-05T13:31:05.695Z",
  //         "updatedAt": "2024-02-05T13:31:05.695Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e319a3c09758ed29540d",
  //         "question_name": "Minimum Window Substring",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-window-substring/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-window-substring/"
  //         ],
  //         "createdAt": "2024-02-05T13:31:05.695Z",
  //         "updatedAt": "2024-02-05T13:31:05.695Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e319a3c09758ed29540e",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T13:31:05.695Z",
  //         "updatedAt": "2024-02-05T13:31:05.695Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e319a3c09758ed29540f",
  //         "question_name": "Substring with Concatenation of All Words",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
  //         ],
  //         "createdAt": "2024-02-05T13:31:05.695Z",
  //         "updatedAt": "2024-02-05T13:31:05.695Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e319a3c09758ed295410",
  //         "question_name": "Valid Number",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/valid-number/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:31:05.695Z",
  //         "updatedAt": "2024-02-05T13:31:05.695Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:31:05.705Z",
  //     "__v": 3
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82273",
  //     "category_name": "Strings",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=dlt9Gyq6rb0&list=PLDdcY4olLQk0A0o2U0fOUjmO2v3X6GOxX"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0ebffa3c09758ed2956c7",
  //         "question_name": "Reverse a String",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/reverse-string/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-string/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956c8",
  //         "question_name": "Palindrome Checker",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-palindrome/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-palindrome/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956c9",
  //         "question_name": "First Unique Character in a String",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/first-unique-character-in-a-string/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/first-unique-character-in-a-string/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956ca",
  //         "question_name": "String to Integer (atoi)",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/string-to-integer-atoi/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/string-to-integer-atoi/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956cb",
  //         "question_name": "Implement strStr()",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/implement-strstr/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/implement-strstr/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956cc",
  //         "question_name": "Count and Say",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/count-and-say/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/count-and-say/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ebffa3c09758ed2956cd",
  //         "question_name": "Valid Anagram",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-anagram/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-anagram/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:03.117Z",
  //         "updatedAt": "2024-02-05T14:09:03.117Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956de",
  //         "question_name": "Longest Substring Without Repeating Characters",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-substring-without-repeating-characters/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956df",
  //         "question_name": "Group Anagrams",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/group-anagrams/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/group-anagrams/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956e0",
  //         "question_name": "Longest Palindromic Substring",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/longest-palindromic-substring/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-palindromic-substring/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956e1",
  //         "question_name": "ZigZag Conversion",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/zigzag-conversion/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/zigzag-conversion/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956e2",
  //         "question_name": "Valid Parentheses",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/valid-parentheses/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-parentheses/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956e3",
  //         "question_name": "Multiply Strings",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/multiply-strings/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/multiply-strings/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec0da3c09758ed2956e4",
  //         "question_name": "Permutation in String",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/permutation-in-string/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/permutation-in-string/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:17.202Z",
  //         "updatedAt": "2024-02-05T14:09:17.202Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956ee",
  //         "question_name": "Regular Expression Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/regular-expression-matching/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/regular-expression-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956ef",
  //         "question_name": "Longest Valid Parentheses",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-valid-parentheses/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-valid-parentheses/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f0",
  //         "question_name": "Minimum Window Substring",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-window-substring/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-window-substring/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f1",
  //         "question_name": "Edit Distance",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/edit-distance/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/edit-distance/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f2",
  //         "question_name": "Palindrome Partitioning II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/palindrome-partitioning-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/palindrome-partitioning-ii/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f3",
  //         "question_name": "Substring with Concatenation of All Words",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f4",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f5",
  //         "question_name": "Decode Ways",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/decode-ways/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-ways/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f6",
  //         "question_name": "Longest Consecutive Sequence",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/longest-consecutive-sequence/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/longest-consecutive-sequence/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0ec1ca3c09758ed2956f7",
  //         "question_name": "Regular Expression Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/regular-expression-matching/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/regular-expression-matching/"
  //         ],
  //         "createdAt": "2024-02-05T14:09:32.316Z",
  //         "updatedAt": "2024-02-05T14:09:32.316Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T14:09:32.325Z",
  //     "__v": 3
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82274",
  //     "category_name": "Linked List",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=dmb1i4oN5oE&list=PLnccP3XNVxGrks-guEVjE1xj9V9YC5oQ7"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e3e8a3c09758ed295418",
  //         "question_name": "Reverse Linked List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/reverse-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.898Z",
  //         "updatedAt": "2024-02-05T13:34:32.898Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed295419",
  //         "question_name": "Middle of the Linked List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/middle-of-the-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/middle-of-the-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541a",
  //         "question_name": "Palindrome Linked List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/palindrome-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/palindrome-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541b",
  //         "question_name": "Merge Two Sorted Lists",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/merge-two-sorted-lists/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-two-sorted-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541c",
  //         "question_name": "Remove Nth Node From End of List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541d",
  //         "question_name": "Intersection of Two Linked Lists",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/intersection-of-two-linked-lists/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/intersection-of-two-linked-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541e",
  //         "question_name": "Cycle Detection in Linked List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/linked-list-cycle/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/linked-list-cycle/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed29541f",
  //         "question_name": "Remove Duplicates from Sorted List",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-duplicates-from-sorted-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed295420",
  //         "question_name": "Reverse Linked List II",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/reverse-linked-list-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-linked-list-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3e8a3c09758ed295421",
  //         "question_name": "Linked List Cycle II",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/linked-list-cycle-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/linked-list-cycle-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:32.899Z",
  //         "updatedAt": "2024-02-05T13:34:32.899Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295438",
  //         "question_name": "Add Two Numbers",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/add-two-numbers/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/add-two-numbers/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295439",
  //         "question_name": "Copy List with Random Pointer",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/copy-list-with-random-pointer/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/copy-list-with-random-pointer/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543a",
  //         "question_name": "Odd Even Linked List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/odd-even-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/odd-even-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543b",
  //         "question_name": "Reverse Nodes in k-Group",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/reverse-nodes-in-k-group/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-nodes-in-k-group/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543c",
  //         "question_name": "Flatten a Multilevel Doubly Linked List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543d",
  //         "question_name": "Partition List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/partition-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/partition-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543e",
  //         "question_name": "LRU Cache",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/lru-cache/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/lru-cache/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29543f",
  //         "question_name": "Reorder List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/reorder-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reorder-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295440",
  //         "question_name": "Remove Linked List Elements",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/remove-linked-list-elements/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-linked-list-elements/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295441",
  //         "question_name": "Intersection of Three Sorted Arrays",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/intersection-of-three-sorted-arrays/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/intersection-of-three-sorted-arrays/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295442",
  //         "question_name": "Sort List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/sort-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/sort-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295443",
  //         "question_name": "Next Greater Node In Linked List",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/next-greater-node-in-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/next-greater-node-in-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295444",
  //         "question_name": "Convert Binary Number in a Linked List to Integer",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295445",
  //         "question_name": "Sort Colors",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/sort-colors/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/sort-colors/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295446",
  //         "question_name": "Remove Duplicates from Sorted List II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295447",
  //         "question_name": "Add Two Numbers II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/add-two-numbers-ii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/add-two-numbers-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295448",
  //         "question_name": "Convert Sorted List to Binary Search Tree",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed295449",
  //         "question_name": "Split Linked List in Parts",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/split-linked-list-in-parts/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/split-linked-list-in-parts/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e3fca3c09758ed29544a",
  //         "question_name": "Add Two Polynomials Represented as Linked Lists",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:34:52.191Z",
  //         "updatedAt": "2024-02-05T13:34:52.191Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295460",
  //         "question_name": "Merge k Sorted Lists",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/merge-k-sorted-lists/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-k-sorted-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.157Z",
  //         "updatedAt": "2024-02-05T13:35:09.157Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295461",
  //         "question_name": "Reverse Linked List III",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/reverse-linked-list-iii/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/reverse-linked-list-iii/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.157Z",
  //         "updatedAt": "2024-02-05T13:35:09.157Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295462",
  //         "question_name": "Sort List Using Random Pointer",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/sort-list-using-random-pointer/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/sort-list-using-random-pointer/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.157Z",
  //         "updatedAt": "2024-02-05T13:35:09.157Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295463",
  //         "question_name": "Swapping Nodes in a Linked List",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.157Z",
  //         "updatedAt": "2024-02-05T13:35:09.157Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295464",
  //         "question_name": "Copy List with Random Pointer",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/copy-list-with-random-pointer/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/copy-list-with-random-pointer/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.157Z",
  //         "updatedAt": "2024-02-05T13:35:09.157Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e40da3c09758ed295465",
  //         "question_name": "Insert into a Sorted Circular Linked List",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/solutions",
  //         "question_link": [
  //           "https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/"
  //         ],
  //         "createdAt": "2024-02-05T13:35:09.158Z",
  //         "updatedAt": "2024-02-05T13:35:09.158Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:35:09.167Z",
  //     "__v": 3
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82275",
  //     "category_name": "Recursions",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=yVdKa8dnKiE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e47ba3c09758ed29546e",
  //         "question_name": "Factorial",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/program-for-factorial-of-a-number/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/program-for-factorial-of-a-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed29546f",
  //         "question_name": "Fibonacci Series",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295470",
  //         "question_name": "Sum of Digits",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/sum-of-the-digits-of-a-number/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/sum-of-the-digits-of-a-number/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295471",
  //         "question_name": "Power of a Number",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295472",
  //         "question_name": "Binary Search",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/binary-search/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/binary-search/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295473",
  //         "question_name": "Tower of Hanoi",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295474",
  //         "question_name": "Subset Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295475",
  //         "question_name": "Permutations",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295476",
  //         "question_name": "Combination Sum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295477",
  //         "question_name": "Palindrome Partitioning",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295478",
  //         "question_name": "Sudoku Solver",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/sudoku-backtracking-7/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/sudoku-backtracking-7/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed295479",
  //         "question_name": "Print All Subsets of a Set",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/finding-all-subsets-of-a-given-set-in-java/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/finding-all-subsets-of-a-given-set-in-java/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed29547a",
  //         "question_name": "Rat in a Maze",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed29547b",
  //         "question_name": "Tree Traversal (Inorder, Preorder, Postorder)",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e47ba3c09758ed29547c",
  //         "question_name": "Convert Infix to Postfix",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/"
  //         ],
  //         "createdAt": "2024-02-05T13:36:59.437Z",
  //         "updatedAt": "2024-02-05T13:36:59.437Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed29549d",
  //         "question_name": "The N-Queens Problem",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed29549e",
  //         "question_name": "Expression Add Operators",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/expression-add-operators/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/expression-add-operators/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed29549f",
  //         "question_name": "Wildcard Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/wildcard-matching/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/wildcard-matching/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a0",
  //         "question_name": "Regular Expression Matching",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/regular-expression-matching/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/regular-expression-matching/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a1",
  //         "question_name": "Sudoku Solver",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/sudoku-solver/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sudoku-solver/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a2",
  //         "question_name": "Unique Paths III",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/unique-paths-iii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/unique-paths-iii/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a3",
  //         "question_name": "Minimum Window Substring",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-window-substring/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-window-substring/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a4",
  //         "question_name": "Merge k Sorted Lists",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/merge-k-sorted-lists/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/merge-k-sorted-lists/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e4bba3c09758ed2954a5",
  //         "question_name": "Maximum Depth of Binary Tree",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/maximum-depth-of-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:38:03.659Z",
  //         "updatedAt": "2024-02-05T13:38:03.659Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:38:03.663Z",
  //     "__v": 2
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82276",
  //     "category_name": "Stacks",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=P1bAPZg5uaE&list=PL_z_8CaSLPWdeOezg68SKkeLN4-T_jNHd"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e548a3c09758ed2954b1",
  //         "question_name": "Implement Stack using Arrays",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/implement-a-stack-using-array/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/implement-a-stack-using-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b2",
  //         "question_name": "Valid Parentheses",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/valid-parentheses/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/valid-parentheses/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b3",
  //         "question_name": "Min Stack",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/min-stack/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/min-stack/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b4",
  //         "question_name": "Implement Stack using Queues",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/implement-stack-using-queues/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/implement-stack-using-queues/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b5",
  //         "question_name": "Evaluate Reverse Polish Notation",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/evaluate-reverse-polish-notation/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b6",
  //         "question_name": "Decode String",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/decode-string/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/decode-string/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b7",
  //         "question_name": "Next Greater Element II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/next-greater-element-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/next-greater-element-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b8",
  //         "question_name": "Remove Duplicate Letters",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/remove-duplicate-letters/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/remove-duplicate-letters/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954b9",
  //         "question_name": "Largest Rectangle in Histogram",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/largest-rectangle-in-histogram/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/largest-rectangle-in-histogram/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954ba",
  //         "question_name": "Sliding Window Maximum",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/sliding-window-maximum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sliding-window-maximum/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954bb",
  //         "question_name": "Trapping Rain Water",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/trapping-rain-water/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/trapping-rain-water/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e548a3c09758ed2954bc",
  //         "question_name": "Expression Add Operators",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/expression-add-operators/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/expression-add-operators/"
  //         ],
  //         "createdAt": "2024-02-05T13:40:24.636Z",
  //         "updatedAt": "2024-02-05T13:40:24.636Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:40:24.649Z",
  //     "__v": 1
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82277",
  //     "category_name": "Queues",
  //     "category_resources": [
  //       "https://www.youtube.com/watch?v=P1bAPZg5uaE&list=PL_z_8CaSLPWdeOezg68SKkeLN4-T_jNHd"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e59aa3c09758ed2954d7",
  //         "question_name": "Implement Queue using Arrays",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/",
  //         "question_link": [
  //           "https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954d8",
  //         "question_name": "Design Circular Queue",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/design-circular-queue/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/design-circular-queue/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954d9",
  //         "question_name": "Queue using Stacks",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/implement-queue-using-stacks/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/implement-queue-using-stacks/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954da",
  //         "question_name": "Design Hit Counter",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/design-hit-counter/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/design-hit-counter/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954db",
  //         "question_name": "Moving Average from Data Stream",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/moving-average-from-data-stream/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/moving-average-from-data-stream/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954dc",
  //         "question_name": "Implement Stack using Queues",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/implement-stack-using-queues/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/implement-stack-using-queues/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954dd",
  //         "question_name": "Design Circular Deque",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/design-circular-deque/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/design-circular-deque/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954de",
  //         "question_name": "Sliding Window Maximum",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/sliding-window-maximum/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/sliding-window-maximum/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954df",
  //         "question_name": "Number of Recent Calls",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/number-of-recent-calls/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/number-of-recent-calls/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954e0",
  //         "question_name": "Perfect Squares",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/perfect-squares/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/perfect-squares/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954e1",
  //         "question_name": "Reconstruct Itinerary",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/reconstruct-itinerary/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/reconstruct-itinerary/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954e2",
  //         "question_name": "Serialize and Deserialize Binary Tree",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e59aa3c09758ed2954e3",
  //         "question_name": "The Maze II",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/the-maze-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/the-maze-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:41:46.911Z",
  //         "updatedAt": "2024-02-05T13:41:46.911Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:41:46.918Z",
  //     "__v": 1
  //   },
  //   {
  //     "_id": "65c0a77fc67648630cf82278",
  //     "category_name": "Greedy Algorithms",
  //     "category_resources": [
  //       "https://www.youtube.com/playlist?list=PLjeQ9Mb66hM3-awRd9EmL4dEhNc93MG-V"
  //     ],
  //     "questions": [
  //       {
  //         "_id": "65c0e63da3c09758ed295500",
  //         "question_name": "Minimum Operations to Reduce X to Zero",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295501",
  //         "question_name": "Non-decreasing Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/non-decreasing-array/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/non-decreasing-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295502",
  //         "question_name": "Maximum Product of Two Elements in an Array",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295503",
  //         "question_name": "Richest Customer Wealth",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/richest-customer-wealth/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/richest-customer-wealth/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295504",
  //         "question_name": "Best Time to Buy and Sell Stock II",
  //         "question_difficulty": "Easy",
  //         "question_solution": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295505",
  //         "question_name": "Minimum Domino Rotations For Equal Row",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295506",
  //         "question_name": "Smallest Range II",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/smallest-range-ii/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/smallest-range-ii/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295507",
  //         "question_name": "Maximum Length of Pair Chain",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/maximum-length-of-pair-chain/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/maximum-length-of-pair-chain/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295508",
  //         "question_name": "Determine if String Halves Are Alike",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/determine-if-string-halves-are-alike/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/determine-if-string-halves-are-alike/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed295509",
  //         "question_name": "Capacity To Ship Packages Within D Days",
  //         "question_difficulty": "Medium",
  //         "question_solution": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed29550a",
  //         "question_name": "Find the Celebrity",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/find-the-celebrity/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/find-the-celebrity/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed29550b",
  //         "question_name": "Jump Game VI",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/jump-game-vi/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/jump-game-vi/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed29550c",
  //         "question_name": "Stone Game",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/stone-game/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/stone-game/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       },
  //       {
  //         "_id": "65c0e63da3c09758ed29550d",
  //         "question_name": "Minimum Number of Taps to Open to Water a Garden",
  //         "question_difficulty": "Hard",
  //         "question_solution": "https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/solutions/",
  //         "question_link": [
  //           "https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/"
  //         ],
  //         "createdAt": "2024-02-05T13:44:29.030Z",
  //         "updatedAt": "2024-02-05T13:44:29.030Z",
  //         "__v": 0
  //       }
  //     ],
  //     "createdAt": "2024-02-05T09:16:47.348Z",
  //     "updatedAt": "2024-02-05T13:44:29.036Z",
  //     "__v": 1
  //   }
  // ]


  const context = useContext(QuestionsContext);
  const { category } = context;

  return (
    <div className='min-h-screen bg-gray-400'>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Categories/>} />
          <Route exact path={`/${category.category_name}`} element={<Questions c_data={category} />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
