#!/usr/bin/env node

import dotenv from 'dotenv';
import { execa } from 'execa';

dotenv.config();

async function testContainerUseFinal() {
  console.log('🎯 CONTAINER USE FINAL WORKFLOW TEST\n');
  
  try {
    // Step 1: Create a fresh environment by running Claude directly
    console.log('🤖 Step 1: Creating fresh environment with Claude agent...');
    
    const prompt = 'Create a simple package.json file for a Node.js project called "final-test" with lodash dependency and test script';
    console.log(`Prompt: "${prompt}"`);
    
    // Run claude command directly - this should create a new environment
    const claudeResult = await execa('echo', [prompt], { 
      encoding: 'utf8',
    }).then(result => 
      execa('claude', ['-p', '--output-format', 'stream-json', '--verbose'], {
        input: result.stdout,
        encoding: 'utf8',
        timeout: 60000,
        env: {
          ...process.env,
          ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY
        }
      })
    );
    
    console.log('Claude execution completed');
    
    // Step 2: Wait a moment for environment to be registered
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Step 3: List environments to find the newest one
    console.log('\n📋 Step 2: Finding newest environment...');
    const listResult = await execa('container-use', ['list'], { encoding: 'utf8' });
    console.log('Environments:');
    console.log(listResult.stdout);
    
    // Extract the most recent environment ID (first in list after header)
    const lines = listResult.stdout.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('No environments found');
    }
    
    const envLine = lines[1]; // Skip header
    const envId = envLine.split(/\s+/)[0];
    console.log(`\nWorking with newest environment: ${envId}`);
    
    // Step 4: Review what the agent did
    console.log('\n🔍 Step 3: Reviewing agent work...');
    
    const diffResult = await execa('container-use', ['diff', envId], { encoding: 'utf8' });
    console.log('Changes made:');
    console.log(diffResult.stdout || '(no changes detected)');
    
    const logResult = await execa('container-use', ['log', envId], { encoding: 'utf8' });
    console.log('\nCommand history:');
    console.log(logResult.stdout);
    
    // Step 5: Apply changes to host git branch
    console.log('\n✅ Step 4: Applying changes to git branch...');
    
    const applyResult = await execa('container-use', ['apply', envId], { encoding: 'utf8' });
    console.log('Apply result:', applyResult.stdout);
    
    // Step 6: Check git status and commit
    console.log('\n📝 Step 5: Checking git status...');
    const gitStatus = await execa('git', ['status', '--porcelain'], { encoding: 'utf8' });
    console.log('Git status:', gitStatus.stdout || '(no changes)');
    
    if (gitStatus.stdout.trim()) {
      // Create a branch and commit only the new changes (exclude secrets)
      const branchName = `container-use-final-${Date.now()}`;
      await execa('git', ['checkout', '-b', branchName]);
      
      // Only add specific files, not the entire working directory
      const statusLines = gitStatus.stdout.trim().split('\n');
      const newFiles = statusLines
        .filter(line => line.startsWith('??') && !line.includes('.container-use') && !line.includes('bin/'))
        .map(line => line.substring(3));
      
      if (newFiles.length > 0) {
        for (const file of newFiles) {
          await execa('git', ['add', file]);
        }
        
        await execa('git', ['commit', '-m', 'Add package.json via Container Use final workflow']);
        
        console.log(`✅ Created branch: ${branchName}`);
        
        // Step 7: Push to GitHub
        console.log('\n🚀 Step 6: Pushing to GitHub...');
        const pushResult = await execa('git', ['push', 'origin', branchName], { encoding: 'utf8' });
        console.log('Push successful!');
        
        // Step 8: Create PR via GitHub API
        console.log('\n🔗 Step 7: Creating Pull Request...');
        
        const prResponse = await fetch('https://api.github.com/repos/joedanz/test-repo/pulls', {
          method: 'POST',
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Add package.json via Container Use final workflow',
            body: `Created via Container Use environment: ${envId}\n\nChanges:\n\`\`\`\n${diffResult.stdout}\n\`\`\``,
            head: branchName,
            base: 'main'
          })
        });
        
        if (prResponse.ok) {
          const prData = await prResponse.json();
          console.log(`✅ PR created successfully: ${prData.html_url}`);
          console.log(`PR #${prData.number}: ${prData.title}`);
        } else {
          const errorText = await prResponse.text();
          console.error(`❌ PR creation failed: ${prResponse.status} ${errorText}`);
        }
      } else {
        console.log('No new files to commit');
      }
    } else {
      console.log('No changes to commit');
    }
    
    // Don't delete environment for debugging
    console.log(`\n🧹 Environment ${envId} kept for debugging`);
    
    console.log('\n🎉 Container Use final workflow test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.stdout) console.log('stdout:', error.stdout);
    if (error.stderr) console.log('stderr:', error.stderr);
    process.exit(1);
  }
}

testContainerUseFinal().catch(console.error); 